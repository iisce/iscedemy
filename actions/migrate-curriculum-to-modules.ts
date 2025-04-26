// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function migrateCurriculumToModules() {
//   try {
//     console.log('Starting curriculum to modules migration...');

//     // Step 1: Fetch all Curriculum entries
//     const curriculums = await prisma.curriculum.findMany({
//       include: {
//         course: true,
//       },
//     });

//     // Step 2: Group Curriculum entries by courseId
//     const curriculumByCourse = curriculums.reduce((acc, curr) => {
//       if (!acc[curr.courseId]) {
//         acc[curr.courseId] = [];
//       }
//       acc[curr.courseId].push(curr);
//       return acc;
//     }, {} as Record<string, typeof curriculums>);

//     // Step 3: Create a new Curriculum for each course and convert old Curriculum entries to Modules
//     for (const courseId of Object.keys(curriculumByCourse)) {
//       const courseCurriculums = curriculumByCourse[courseId];
//       console.log(`Processing course: ${courseId} with ${courseCurriculums.length} curriculum entries`);

//       // Check if a new Curriculum already exists for this course
//       let newCurriculum = await prisma.curriculum.findFirst({
//         where: { courseId },
//       });

//       if (!newCurriculum) {
//         // Create a new Curriculum for this course
//         newCurriculum = await prisma.curriculum.create({
//           data: {
//             courseId,
//             headingNumber: "1", // Temporary value, will be removed later
//             headingName: "Default Curriculum", // Temporary value
//             headingDescription: "Default Curriculum Description", // Temporary value
//           },
//         });
//         console.log(`Created new Curriculum for course ${courseId}`);
//       }

//       // Convert each old Curriculum entry to a Module
//       let order = 1;
//       for (const oldCurriculum of courseCurriculums) {
//         // Check if a Module already exists for this course with the same title
//         const existingModule = await prisma.module.findFirst({
//           where: {
//             courseId,
//             title: oldCurriculum.headingName,
//           },
//         });

//         if (existingModule) {
//           // Update the existing Module with new fields
//           await prisma.module.update({
//             where: { id: existingModule.id },
//             data: {
//               curriculumId: newCurriculum.id,
//               headingNumber: oldCurriculum.headingNumber,
//               headingName: oldCurriculum.headingName,
//               headingDescription: oldCurriculum.headingDescription,
//               duration: '2 weeks',
//               order: order++,
//             },
//           });
//           console.log(`Updated existing module ${existingModule.id} for course ${courseId}`);
//         } else {
//           // Create a new Module
//           await prisma.module.create({
//             data: {
//               curriculumId: newCurriculum.id,
//               courseId,
//               title: oldCurriculum.headingName,
//               description: oldCurriculum.headingDescription,
//               headingNumber: oldCurriculum.headingNumber,
//               headingName: oldCurriculum.headingName,
//               headingDescription: oldCurriculum.headingDescription,
//               duration: '2 weeks',
//               order: order++,
//               createdAt: oldCurriculum.createdAt || new Date(),
//               updatedAt: oldCurriculum.updatedAt || new Date(),
//             },
//           });
//           console.log(`Created new module for old curriculum ${oldCurriculum.id}`);
//         }
//       }
//     }

//     // Step 4: Update existing Modules that weren't part of old Curriculum entries
//     const remainingModules = await prisma.module.findMany({
//       where: { curriculumId: null },
//       include: { course: true },
//     });

//     for (const module of remainingModules) {
//       // Find or create a Curriculum for this course
//       let curriculum = await prisma.curriculum.findFirst({
//         where: { courseId: module.courseId },
//       });

//       if (!curriculum) {
//         curriculum = await prisma.curriculum.create({
//           data: {
//             courseId: module.courseId,
//             headingNumber: "1", // Temporary value, will be removed later
//             headingName: "Default Curriculum", // Temporary value
//             headingDescription: "Default Curriculum Description", // Temporary value
//           },
//         });
//         console.log(`Created new Curriculum for course ${module.courseId}`);
//       }

//       // Update the Module to copy title to headingName and description to headingDescription
//       await prisma.module.update({
//         where: { id: module.id },
//         data: {
//           curriculumId: curriculum.id,
//           headingNumber: module.order.toString(),
//           headingName: module.title,
//           headingDescription: module.description || '',
//           duration: '2 weeks',
//         },
//       });
//       console.log(`Updated remaining module ${module.id} for course ${module.courseId}`);
//     }

//     // Step 5: Delete the old Curriculum entries after migration
//     await prisma.curriculum.deleteMany({
//       where: {
//         id: {
//           in: curriculums.map(c => c.id),
//         },
//       },
//     });
//     console.log(`Deleted ${curriculums.length} old curriculum entries`);

//     console.log('Curriculum to modules migration completed successfully!');
//   } catch (error) {
//     console.error('Error during curriculum to modules migration:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
