import StudentCard from "@/components/pages/dashboard/student-card";
import { getAllStudents } from "@/data/student";
import { Student } from "@/lib/types";
import React from "react";

export default async function AdminStudents() {
	const students: Student[] = await getAllStudents();

	return (
          <div className="grid gap-4 py-4 lg:col-span-4">
               {students.map(student => (
                    <StudentCard key={student.id} student={student}/>
               ))}
          </div>
	);
}
