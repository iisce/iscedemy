import { db } from "@/lib/db";

export async function getCompletedLessonsByUserAndCourse(userId: string, curriculumId: string) {
    return await db.completedLesson.findMany({
        where: {
            userId,
            lesson: { module: { curriculumId } }
        }
    });
}