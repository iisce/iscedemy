import { Metadata } from "next";
import StudentCard from "../../../../components/pages/dashboard/student-card";
import { getAllStudents } from "../../../../data/student";
import { Student } from "../../../../lib/types";
import React from "react";


export const metadata: Metadata = {
	title: 'Student Dashboard',
	description: 'Stay in-charge of your courses and monitor your learning process!',
	metadataBase: new URL('https://www.palmtechniq.com/student'),
	alternates:{
	  canonical: '/student',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: 'Student Dashboard',
	  description: 'Stay in-charge of your courses and monitor your learning process!',
	  url: 'https://www.palmtechniq.com/student',
	  siteName: 'PalmTechnIQ',
	  images: '/innovation.jpg'
	}
  }

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
