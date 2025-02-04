  // data/student.ts

import { db } from "../lib/db";
import { Student } from "../lib/types";

export async function getAllStudents(): Promise<Student[]> {
  try {
    const students = await db.user.findMany({
      where: {
        role: 'STUDENT',
      },
      include: {
        Course: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    // Transform the database result into the Student type if necessary
    return students.map(student => ({
      id: student.id,
      name: student.name || "",
      image: student.image || "",
      email: student.email || "",
      phone: student.phone || "",
      courses: student.Course.map(course => ({
        id: course.id,
        title: course.title,
      })),
    }));
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}
