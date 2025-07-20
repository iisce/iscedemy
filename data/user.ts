import { db } from "@/lib/db";
import { User } from "@prisma/client";

/**
 * Fetches a user by email with selected fields
 * @param email - User's email
 * @returns User object or null
 */
export default async function getUserByEmail(
     email: string,
): Promise<User | null> {
     try {
          const user = await db.user.findUnique({
               where: {
                    email,
               },
          });
          return user;
     } catch (error) {
          if (process.env.NODE_ENV !== "production") {
               console.error(`Error fetching user by email ${email}:`, error);
          }
          return null;
     }
}

/**
 * Fetches a user by ID with minimal fields for enrollment
 * @param id - User's ID
 * @returns User object with selected fields or null
 */
export async function getUserById(id: string): Promise<User | null> {
     try {
          const user = await db.user.findUnique({
               where: {
                    id,
               },
          });
          return user;
     } catch (error) {
          if (process.env.NODE_ENV !== "production") {
               console.error(`Error fetching user with ID ${id}:`, error);
          }
          return null;
     }
}

/**
 * Fetches users enrolled in a course
 * @param courseId - Course ID
 * @returns Array of users or null
 */
export async function getUserByCourseId(
     courseId: string,
): Promise<Pick<User, "id">[] | null> {
     try {
          const users = await db.user.findMany({
               where: {
                    courses: {
                         contains: courseId,
                         mode: "insensitive",
                    },
               },
               select: { id: true },
          });
          return users;
     } catch (error) {
          if (process.env.NODE_ENV !== "production") {
               console.error(
                    `Error fetching users for course ${courseId}:`,
                    error,
               );
          }
          return null;
     }
}

/**
 * Counts users excluding tutors and admins
 * @returns Number of users
 */
export async function getTotalUsersExcludingTutors(): Promise<number> {
     try {
          const count = await db.user.count({
               where: {
                    role: {
                         notIn: ["TUTOR", "ADMIN"],
                    },
               },
          });
          return count;
     } catch (error) {
          if (process.env.NODE_ENV !== "production") {
               console.error("Error counting users:", error);
          }
          return 0;
     }
}

/**
 * Enrolls a user in a course by appending courseId to the user's courses field
 * @param userId - The unique identifier of the user
 * @param courseId - The unique identifier of the course
 * @returns A boolean indicating success
 */
export async function enrollUserInCourse(
     userId: string,
     courseId: string,
): Promise<boolean> {
     try {
          // Validate user and course concurrently
          const [user, course] = await Promise.all([
               db.user.findUnique({
                    where: { id: userId },
                    select: { id: true, courses: true },
               }),
               db.course.findUnique({
                    where: { id: courseId },
                    select: { id: true, title: true },
               }),
          ]);

          if (!user) {
               throw new Error("User not found");
          }
          if (!course) {
               throw new Error("Course not found");
          }

          const currentCourses = user.courses ? user.courses.split("---") : [];
          if (currentCourses && currentCourses.includes(courseId)) {
               throw new Error("User is already enrolled in this course.");
          }

          if (currentCourses.length >= 3) {
               throw new Error(
                    "User has reached the maximum course enrollment limit",
               );
          }

          const updatedCourses = [...currentCourses, courseId].join("---");
          await db.user.update({
               where: { id: userId },
               data: { courses: updatedCourses },
          });

          return true;
     } catch (error) {
          if (process.env.NODE_ENV !== "production") {
               console.error("Failed to enroll user in course:", error);
          }
          return false;
     }
}
