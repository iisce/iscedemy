'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { Student } from "@/lib/types";
import { useState } from "react";



  interface StudentCardProps {
    student: Student;
  }
  

export default function StudentCard({ student }: StudentCardProps) {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{student.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <Image src={student.image} alt={student.name!} width={50} height={50} className="w-full h-32 object-cover rounded-md" /> */}
                    <p>Courses: {student.courses.length > 0 ? student.courses.map(course => course.title).join(', ') : 'No course purchased'}</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={() => setModalOpen(true)}>See More</Button>
                </CardFooter>
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">{student.name}</h2>
                    {/* <Image src={student.image} alt={student.name!}  width={50} height={50} className="w-full h-32 object-cover rounded-md mb-4" /> */}
                    <p>Email: {student.email}</p>
                    <p>Phone: {student.phone}</p>
                    <p>Course: {student.courses.length > 0 ? student.courses.map(course => course.title).join(', '): 'No course purchased'}</p>
                </div>
            </Modal>
        </>
    );
}