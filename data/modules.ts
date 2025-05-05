import { db } from '@/lib/db'

export async function getAllModulesByCurriculumId(curriculumId: string) {
  return  await db.module.findMany({
    where: {
      curriculumId,
    },
    include: {
      lessons: true
    },
    orderBy: {
      order: 'asc',
    },
  })
}
