import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateCurriculumTimestamps() {
  try {
    console.log('Starting update for Curriculum timestamps...');

    // Fetch all Curriculum entries
    const curriculums = await prisma.curriculum.findMany();

    // Update each Curriculum with createdAt and updatedAt
    for (const curriculum of curriculums) {
      await prisma.curriculum.update({
        where: { id: curriculum.id },
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log(`Updated timestamps for Curriculum ${curriculum.id}`);
    }

    console.log('Update for Curriculum timestamps completed successfully!');
  } catch (error) {
    console.error('Error during update for Curriculum timestamps:', error);
  } finally {
    await prisma.$disconnect();
  }
}
