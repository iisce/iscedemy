import { db } from "@/lib/db";
import { ProjectSubmission } from "@prisma/client";

export async function getSubmissionsByStudent(studentId: string): Promise<ProjectSubmission[]> {
  return db.projectSubmission.findMany({
    where: { userId: studentId },
    include: { project: true },
  });
}

export async function getSubmissionsByStudentAndCourse(studentId: string, courseId: string) {
  return db.projectSubmission.findMany({
    where: {
      userId: studentId,
      project: { courseId },
    },
    include: { project: true },
  });
}