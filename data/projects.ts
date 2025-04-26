import { db } from '@/lib/db'

export async function getProjectsByCourseId(courseId: string) {
  return await db.project.findMany({
    where:{
        courseId
    }
  })
}
