// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function fixModuleCurriculumId() {
//   try {
//     console.log('Starting fix for Module curriculumId...');

//     // Step 1: Fetch all Modules with NULL curriculumId
//     const modulesWithoutCurriculumId = await prisma.module.findMany({
//       where: { curriculumId: null },
//       include: { course: true },
//     });

//     console.log(`Found ${modulesWithoutCurriculumId.length} modules with NULL curriculumId`);

//     // Step 2: For each Module, find or create a Curriculum for its courseId
//     for (const module of modulesWithoutCurriculumId) {
//       let curriculum = await prisma.curriculum.findFirst({
//         where: { courseId: module.courseId },
//       });

//       if (!curriculum) {
//         // Create a new Curriculum for this course
//         curriculum = await prisma.curriculum.create({
//           data: {
//             courseId: module.courseId,
//             headingNumber: "1", // Temporary value
//             headingName: "Default Curriculum", // Temporary value
//             headingDescription: "Default Curriculum Description", // Temporary value
//           },
//         });
//         console.log(`Created new Curriculum for course ${module.courseId}`);
//       }

//       // Step 3: Update the Module with the curriculumId
//       await prisma.module.update({
//         where: { id: module.id },
//         data: {
//           curriculumId: curriculum.id,
//         },
//       });
//       console.log(`Updated module ${module.id} with curriculumId ${curriculum.id}`);
//     }

//     console.log('Fix for Module curriculumId completed successfully!');
//   } catch (error) {
//     console.error('Error during fix for Module curriculumId:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
