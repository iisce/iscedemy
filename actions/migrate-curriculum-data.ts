// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function migrateCurriculumData() {
//   try {
//     console.log('Starting curriculum data migration...');

//     // Step 1: Find all courses that have modules
//     const coursesWithModules = await prisma.course.findMany({
//       include: {
//         modules: true,
//       },
//     });

//     // Step 2: For each course, create a Curriculum and update its modules
//     for (const course of coursesWithModules) {
//       if (course.modules.length === 0) continue;

//       console.log(`Processing course: ${course.title} (${course.id})`);

//       // Check if a Curriculum already exists for this course
//       let curriculum = await prisma.curriculum.findUnique({
//         where: { courseId: course.id },
//       });

//       if (!curriculum) {
//         // Create a Curriculum for the course
//         curriculum = await prisma.curriculum.create({
//           data: {
//             courseId: course.id,
//           },
//         });
//         console.log(`Created Curriculum for course ${course.id}`);
//       }

//       // Step 3: Update each module to set curriculumId and new fields
//       for (const module of course.modules) {
//         await prisma.module.update({
//           where: { id: module.id },
//           data: {
//             curriculumId: curriculum.id,
//             headingNumber: module.order.toString(), 
//             headingName: module.title, 
//             headingDescription: module.description || '', 
//             duration: '2 weeks', 
//           },
//         });
//         console.log(`Updated module ${module.id} for course ${course.id}`);
//       }
//     }

//     console.log('Curriculum data migration completed successfully!');
//   } catch (error) {
//     console.error('Error during curriculum data migration:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
