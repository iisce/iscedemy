"use server";
import { auth } from "@/auth";
import { COURSE_PRICING } from "@/lib/course-pricing";
import { db } from "@/lib/db";
import { rateLimit, RateLimitError } from "@/lib/rate-limit";
import { extractVideoId, formatClassDays, toSlug } from "@/lib/utils";
import { CreateCourseSchema, UpdateCourseSchema } from "@/schemas";
import { ProgramType, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * Handles errors consistently across course actions
 * @param error - The error object
 * @param action - The action being performed (e.g., "creating course")
 * @returns Standardized error response
 */
function handleError(error: unknown, action: string) {
     if (error instanceof RateLimitError) {
          return { error: error.message };
     }
     if (error instanceof z.ZodError) {
          return { error: "Invalid input data" };
     }
     if (process.env.NODE_ENV !== "production") {
          console.error(`Error ${action}:`, error);
     }
     return { error: `Failed to ${action}. Please try again.` };
}

/**
 * Creates a new course in the database after validating the input fields.
 * @param values - Input values for creating the course
 * @returns Success response with the created course or an error message
 */
export async function createCourse(values: z.infer<typeof CreateCourseSchema>) {
     try {
          const session = await auth();
          if (
               !session?.user.id ||
               !([UserRole.ADMIN, UserRole.TUTOR] as UserRole[]).includes(
                    session?.user?.role as UserRole,
               )
          ) {
               return {
                    error: "Unauthorized. Only admins or tutors can create courses.",
               };
          }

          await rateLimit({
               key: `create-course:${session.user.id}`,
               limit: 5,
               window: 60,
          });

          const validatedFields = CreateCourseSchema.safeParse(values);
          if (!validatedFields.success) {
               return { error: "Invalid input data" };
          }
          const { title, tutorId, programType } = validatedFields.data;

          const [tutor, existingCourse] = await Promise.all([
               db.user.findUnique({
                    where: { id: tutorId },
                    select: { id: true, role: true },
               }),
               db.course.findFirst({
                    where: { title: toSlug(title), tutorId },
                    select: { id: true },
               }),
          ]);

          if (!tutor || !["ADMIN", "TUTOR"].includes(tutor.role as string)) {
               return { error: "Invalid or unauthorized tutor." };
          }

          if (existingCourse) {
               return {
                    error: "A course with this title already exists for this tutor.",
               };
          }

          const prices =
               COURSE_PRICING[validatedFields.data?.programType as ProgramType];
          if (!prices) {
               return { error: "Invalid program type." };
          }

          const videoId = validatedFields.data.videoUrl
               ? extractVideoId(validatedFields.data.videoUrl)
               : null;

          const newCourse = await db.course.create({
               data: {
                    title: toSlug(title),
                    textSnippet: validatedFields.data?.textSnippet ?? "",
                    description: validatedFields.data?.description ?? "",
                    conclusion: validatedFields.data?.conclusion ?? "",
                    summary: validatedFields.data?.summary ?? "",
                    programType,
                    duration: validatedFields.data?.duration ?? "",
                    category: validatedFields.data?.category ?? "",
                    videoUrl: validatedFields.data?.videoUrl ?? "",
                    videoId,
                    noOfClass: validatedFields.data?.noOfClass ?? "",
                    classDays: formatClassDays(
                         validatedFields.data?.classDays || "",
                    ),
                    certificate: validatedFields.data?.certificate ?? false,
                    overView: validatedFields.data?.overView ?? "",
                    virtualPrice: prices.virtualPrice,
                    physicalPrice: prices.physicalPrice,
                    image:
                         validatedFields.data?.image ||
                         "/images/placeholder-course.jpg",
                    tutorId,
               },
               select: {
                    id: true,
                    title: true,
                    programType: true,
                    virtualPrice: true,
                    physicalPrice: true,
                    tutorId: true,
               },
          });

          // Revalidate cache
          await Promise.all([
               revalidatePath("/courses"),
               revalidatePath(`/courses/${newCourse.title}`),
          ]);

          return { success: "Course created successfully", course: newCourse };
     } catch (error) {
          return handleError(error, "creating course");
     }
}

/**
 * Updates an existing course in the database.
 * @param values - Data to update the course
 * @returns Success response with the updated course or an error message
 */
export async function updateCourse(values: z.infer<typeof UpdateCourseSchema>) {
     try {
          const session = await auth();
          if (
               !session?.user.id ||
               !([UserRole.ADMIN, UserRole.TUTOR] as UserRole[]).includes(
                    session?.user?.role as UserRole,
               )
          ) {
               return {
                    error: "Unauthorized. Only admins or tutors can create courses.",
               };
          }
          await rateLimit({
               key: `update-course:${session.user.id}`,
               limit: 5,
               window: 60,
          });

          const validatedData = UpdateCourseSchema.parse(values);

          const [existingCourse, tutor] = await Promise.all([
               db.course.findUnique({
                    where: { id: validatedData.id },
                    select: {
                         id: true,
                         tutorId: true,
                         programType: true,
                         duration: true,
                         category: true,
                         videoUrl: true,
                         videoId: true,
                         noOfClass: true,
                         classDays: true,
                         certificate: true,
                         overView: true,
                         image: true,
                    },
               }),
               db.user.findUnique({
                    where: { id: validatedData.id ?? session.user.id },
                    select: { id: true, role: true },
               }),
          ]);

          if (!existingCourse) {
               return { error: "Course not found." };
          }

          if (
               validatedData.id &&
               (!tutor || !["TUTOR", "ADMIN"].includes(tutor.role as string))
          ) {
               return { error: "Invalid or unauthorized tutor." };
          }
          // If programType is updated, update the prices accordingly
          const updatedProgramType =
               validatedData.programType || existingCourse.programType;
          const prices = COURSE_PRICING[updatedProgramType as ProgramType];
          if (!prices) {
               return { error: "Invalid program type." };
          }

          const videoId = validatedData.videoUrl
               ? extractVideoId(validatedData.videoUrl)
               : existingCourse.videoId;

          const updatedCourse = await db.course.update({
               where: { id: validatedData.id },
               data: {
                    title: validatedData.title
                         ? toSlug(validatedData.title)
                         : undefined,
                    textSnippet: validatedData.textSnippet,
                    description: validatedData.description,
                    conclusion: validatedData.conclusion,
                    summary: validatedData.summary,
                    programType: updatedProgramType,
                    duration: validatedData.duration || existingCourse.duration,
                    category: validatedData.category || existingCourse.category,
                    videoUrl: validatedData.videoUrl || existingCourse.videoUrl,
                    videoId,
                    noOfClass:
                         validatedData.noOfClass || existingCourse.noOfClass,
                    classDays:
                         validatedData.classDays || existingCourse.classDays,
                    certificate:
                         validatedData.certificate ??
                         existingCourse.certificate,
                    overView: validatedData.overView ?? existingCourse.overView,
                    virtualPrice: prices.virtualPrice,
                    physicalPrice: prices.physicalPrice,
                    image: validatedData.image || existingCourse.image,
               },
               select: {
                    id: true,
                    title: true,
                    programType: true,
                    virtualPrice: true,
                    physicalPrice: true,
                    tutorId: true,
               },
          });
          await Promise.all([
               revalidatePath("/courses"),
               revalidatePath(`/courses/${updatedCourse.title}`),
          ]);

          return {
               success: "Course updated successfully",
               course: updatedCourse,
          };
     } catch (error) {
          return handleError(error, "updating course");
     }
}
