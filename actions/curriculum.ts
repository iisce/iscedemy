// import { auth } from "@/auth";
// import { db } from "@/lib/db";
// import { CreateCurriculumSchema } from "@/schemas";
// import { redirect } from "next/navigation";
// import {z } from "zod";

// export const revalidate = 0;



// export async function createOrUpdateCurriculum(values: z.infer<typeof CreateCurriculumSchema>) {
//     // Check if the user is authenticated and is a tutor
//     const session = await auth();
//     if (!session) {
//       redirect('/login'); // Redirect to login if not authenticated
//     }
//     if (session.user?.name !== 'TUTOR') {
//       return { error: 'Unauthorized: Only tutors can create or update a curriculum' };
//     }
  
//     try {
//       const validatedData = CreateCurriculumSchema.safeParse(values);
//       if (!validatedData.success) {
//         return { error: 'Validation failed: ' + validatedData.error.message };
//       }
  
//       const { courseId, modules } = validatedData.data;

//       // Use a transaction to ensure atomicity
//       const result = await db.$transaction(async (prisma) => {
//         // Check if a curriculum already exists for this course
//         const existingCurriculum = await prisma.curriculum.findUnique({
//           where: { courseId },
//         });
  
//         if (existingCurriculum) {
//           // Delete existing modules and their lessons to replace with new ones
//           await prisma.module.deleteMany({
//             where: { curriculumId: existingCurriculum.id },
//           });
//         }
  
//         // Create or update the curriculum
//         const curriculum = await prisma.curriculum.upsert({
//           where: { courseId},
//           update: {},
//           create: {
//             courseId,
//           },
//         });
  
//         // Create modules and lessons
//         for (const moduleData of modules) {
//           const newModule = await prisma.module.create({
//             data: {
//               curriculumId: curriculum.id,
//               headingNumber: moduleData.headingNumber,
//               headingName: moduleData.headingName,
//               headingDescription: moduleData.headingDescription,
//               duration: moduleData.duration,
//               order: moduleData.order,
//             },
//           });
  
//           for (const lessonData of moduleData.lessons) {
//             await prisma.lesson.create({
//               data: {
//                 moduleId: newModule.id,
//                 title: lessonData.title,
//                 description: lessonData.description || '',
//                 duration: lessonData.duration,
//                 videoUrl: lessonData.videoUrl || '',
//                 order: lessonData.order,
//               },
//             });
//           }
//         }
  
//         return curriculum;
//       });
  
//       return { success: "Curriculum created/updated successfully", curriculum: result };
//     } catch (error) {
//       console.error("Error creating/updating curriculum:", error);
//       return { error: "Failed to create/update curriculum. Please try again." };
//     }
//   }

// export async function hasCurriculum(courseId: string) {

//   if(!courseId || typeof courseId !== 'string') {
//   return("Invalid CourseId")    
//   }

//   const session = await auth();
//   if (!session) {
//     redirect('/login'); // Redirect to login if not authenticated
//   }
//   if (session.user?.role !== 'TUTOR') { // Fixed: Use role instead of name
//     throw new Error('Unauthorized: Only tutors can check curriculum status');
//   }

//           try {
//         const curriculum = await db.curriculum.findUnique({
//             where: { courseId },
//         });
//         return !!curriculum;
//     } catch (error) {
//         console.log({ error });
//         console.error("Error checking curriculum existence:", error);
//         throw new Error('Failed to check curriculum existence');    
//       }
// }