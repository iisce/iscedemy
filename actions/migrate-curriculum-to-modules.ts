// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function migrateCurriculumToModules() {
//   try {
//     console.log('Starting curriculum to modules migration...');

//     // Step 1: Fetch all Curriculum entries
//     const curriculums = await prisma.curriculum.findMany({
//       include: { course: true },
//     });
//     console.log(`Found ${curriculums.length} Curriculum entries to migrate.`);

//     // Step 2: Process each Curriculum and migrate to Modules
//     for (const curriculum of curriculums) {
//       const courseId = curriculum.courseId;
//       console.log(`Processing course: ${courseId} with ${curriculums.filter(c => c.courseId === courseId).length} curriculum entries`);

//       // Find or create a new Curriculum for this courseId
//       const existingCurriculum = await prisma.curriculum.findFirst({
//         where: { courseId },
//         include: { modules: true },
//       });
//       console.log(`Found existing Curriculum for course ${courseId}: Curriculum ID ${existingCurriculum?.id}`);

//       // Migrate each old Curriculum entry to a Module
//       const oldCurriculumsForCourse = curriculums.filter(c => c.courseId === courseId);
//       for (const oldCurriculum of oldCurriculumsForCourse) {
//         const moduleData = {
//           curriculumId: existingCurriculum?.id || null,
//           headingNumber: oldCurriculum.headingNumber,
//           headingName: oldCurriculum.headingName,
//           headingDescription: oldCurriculum.headingDescription,
//           duration: oldCurriculum.duration || 'N/A', // Assuming duration might not exist yet
//           order: oldCurriculumsForCourse.indexOf(oldCurriculum) + 1,
//         };

//         // Check if a module already exists for this curriculum
//         let module = await prisma.module.findFirst({
//           where: { curriculumId: existingCurriculum?.id, order: moduleData.order },
//         });

//         if (module) {
//           // Update existing module
//           module = await prisma.module.update({
//             where: { id: module.id },
//             data: moduleData,
//           });
//           console.log(`Updated existing module ${module.id} for course ${courseId}`);
//         } else {
//           // Create new module
//           module = await prisma.module.create({
//             data: moduleData,
//           });
//           console.log(`Created new module for old curriculum ${oldCurriculum.id}`);
//         }
//       }
//     }

//     // Step 3: Clean up - Remove old Curriculum entries (optional, comment out if not needed)
//     // await prisma.curriculum.deleteMany({
//     //   where: { id: { in: curriculums.map(c => c.id) } },
//     // });
//     // console.log('Old Curriculum entries removed.');

//     console.log('Curriculum to modules migration completed successfully!');
//   } catch (error) {
//     console.error('Error during curriculum to modules migration:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }
