"use server";

import { auth } from "@/auth";
import { enrollUserInCourse } from "@/data/user";
import { rateLimit } from "@/lib/rate-limit";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const enrollSchema = z.object({
     userId: z
          .string()
          .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid user ID" }),
     courseId: z
          .string()
          .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid course ID" }),
});

/**
 * Adds a user to a course by enrolling them using the provided user ID and course ID
 * @param formData - FormData containing userId and courseId
 * @returns An object indicating success or failure with a message
 */
export async function addToCourse(formData: FormData) {
     try {
          const session = await auth();
          if (!session?.user?.id) {
               return { success: false, error: "Unauthorized. Please log in." };
          }

          const { userId, courseId } = enrollSchema.parse({
               userId: formData.get("userId"),
               courseId: formData.get("courseId"),
          });

          if (userId !== session.user.id) {
               return {
                    success: false,
                    error: "Unauthorized: User ID mismatch",
               };
          }

          await rateLimit({ key: `enroll:${userId}`, limit: 5, window: 60 });
          const success = await enrollUserInCourse(userId, courseId);
          if (!success) {
               return { success: false, error: "Failed to enroll in course" };
          }

          revalidatePath("/courses");
          revalidatePath(`/users/${userId}/courses`);

          return { success: true, message: "Successfully enrolled in course" };
     } catch (error) {
          if (process.env.NODE_ENV !== "production") {
               console.error("Error in addToCourse:", error);
          }
          return {
               success: false,
               error: "An error occurred. Please try again.",
          };
     }
}
