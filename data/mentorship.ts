import { db } from '@/lib/db'

export async function getMentorshipsByCourseId(courseId: string) {
  return await db.mentorship.findMany({
    where: {
      courseId,
    },
  })
}
