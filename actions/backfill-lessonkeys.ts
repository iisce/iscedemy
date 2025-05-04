import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export  async function backfillLessonKeys() {
  const lessons = await prisma.lesson.findMany();
  for (const lesson of lessons) {
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { lessonKey: uuidv4() },
    });
  }
  console.log('Backfilled lessonKeys for all lessons.');
}

backfillLessonKeys().catch(console.error).finally(() => prisma.$disconnect());