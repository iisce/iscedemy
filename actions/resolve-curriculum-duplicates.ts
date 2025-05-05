// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function resolveCurriculumDuplicates() {
//   try {
//     console.log('Starting Curriculum duplicate resolution...');

//     // Step 1: Find all duplicate courseIds
//     const duplicateCourseIds = await prisma.$queryRaw`
//       SELECT "courseId", COUNT(*) as count
//       FROM "Curriculum"
//       GROUP BY "courseId"
//       HAVING COUNT(*) > 1;
//     `;

//     console.log(`Found ${duplicateCourseIds.length} courseIds with duplicates.`);

//     for (const { courseId } of duplicateCourseIds) {
//       console.log(`Processing courseId: ${courseId}`);

//       // Step 2: Get all Curriculum entries for this courseId, ordered by id (to keep the first)
//       const curricula = await prisma.curriculum.findMany({
//         where: { courseId },
//         include: { modules: true },
//         orderBy: { id: 'asc' },
//       });

//       if (curricula.length === 0) continue;

//       // Step 3: Keep the first Curriculum as the "primary"
//       const primaryCurriculum = curricula[0];
//       console.log(`Primary Curriculum ID: ${primaryCurriculum.id}`);

//       // Step 4: Reassign Modules from duplicates to the primary Curriculum
//       let currentMaxOrder = await prisma.module
//         .findMany({
//           where: { curriculumId: primaryCurriculum.id },
//           select: { order: true },
//         })
//         .then(modules => Math.max(...modules.map(m => m.order), 0));

//       for (let i = 1; i < curricula.length; i++) {
//         const duplicateCurriculum = curricula[i];
//         for (const module of duplicateCurriculum.modules) {
//           currentMaxOrder += 1;
//           await prisma.module.update({
//             where: { id: module.id },
//             data: {
//               curriculumId: primaryCurriculum.id,
//               order: currentMaxOrder, // Avoid order conflicts
//             },
//           });
//           console.log(`Reassigned Module ${module.id} to Curriculum ${primaryCurriculum.id} with order ${currentMaxOrder}`);
//         }
//       }

//       // Step 5: Delete the duplicate Curricula
//       const duplicateCurriculumIds = curricula.slice(1).map(c => c.id);
//       await prisma.curriculum.deleteMany({
//         where: { id: { in: duplicateCurriculumIds } },
//       });
//       console.log(`Deleted ${duplicateCurriculumIds.length} duplicate Curricula for courseId ${courseId}`);
//     }

//     console.log('Curriculum duplicate resolution completed successfully!');
//   } catch (error) {
//     console.error('Error during Curriculum duplicate resolution:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }
