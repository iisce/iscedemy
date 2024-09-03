import { db } from "@/lib/db";

export const revalidate = 0;

export default async function getUserByEmail(email: string) {
     try {
          const user = await db.user.findUnique({
               where: {
                    email,
               },
          });
          return user;
     } catch {
          return null;
     }
}
export async function getUserById(id: string) {
     try {
          const user = await db.user.findUnique({
               where: {
                    id,
               },
          });
          return user;
     } catch (error) {
          console.error(`Error fetching user with ID ${id}:`, error);
          return null;
     }
}

export async function getUserByCourseId(course: string) {
     try {
          const user = await db.user.findMany({
               where: {
                    courses: {
                         contains: course,
                         mode: "insensitive",
                    },
               },
          });
          return user;
     } catch {
          return null;
     }
}

export async function getTotalUsersExcludingTutors() {
     try {
          const count = await db.user.count({
               where: {
                    role: {
                         not: "TUTOR" || "ADMIN",
                    },
               },
          });
          return count;
     } catch (error) {
          console.log({ error });
          return 0;
     }
}

//This function adds course to a user that hasn't selected up to 3 courses
export async function enrollUserInCourse(userId: string, courseId: string) {
     try {
          // Fetch the user's current courses
          console.log("Fetching user by ID:", userId);
          const user = await getUserById(userId);
          console.log("User fetched:", user);

          if (!user) {
               throw new Error("User not found");
          }

          let currentCourses = user?.courses;

          // Check if the user is already enrolled in the course
          if (currentCourses && currentCourses.includes(courseId)) {
               throw new Error("User is already enrolled in this course.");
          }

          // Add the new course to the array
          currentCourses = currentCourses
               ? currentCourses + "---" + courseId
               : courseId;

          // Convert the array back to a string
          console.log("Updated courses string:", currentCourses);

          // Update user's courses
          await db.user.update({
               where: { id: userId },
               data: {
                    courses: currentCourses,
               },
          });
          console.log("User successfully enrolled in course");
          return true;
     } catch (error) {
          console.error("Failed to enroll user in course:", error);
          return false;
     }
}
