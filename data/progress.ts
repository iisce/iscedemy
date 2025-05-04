import { db } from "@/lib/db";
import { Progress } from "@prisma/client";

export async function getProgressByStudent(studentId: string): Promise<Progress[]> {
    return db.progress.findMany({
        where: {userId: studentId},
        include: {lesson: true}
    })
}

export async function getProgressByStudentAndCourse(studentId: string, courseId: string) {
    return db.progress.findMany({
      where: {
        userId: studentId,
        lesson: { 
          module: {
             curriculum: { 
              courseId 
            },
          },
        },
      },
      include: { lesson: true},
    });
  }

  export async function getTotalLessonsByCourse(courseId: string) {
    const curriculum = await db.curriculum.findUnique({
      where: { courseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });
  
    return curriculum?.modules.reduce((acc, module) => acc + (module.lessons?.length || 0), 0) || 0;
  }