'use client';

import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";

export default function AssignmentsPage({
  tutor,
  courses,
  submissions,
  courseId
}: {
  tutor: any;
  courses: any[];
  courseId: string;
  submissions: any[];
}) {
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesCourse = filterCourse === "all" || submission.project.courseId === filterCourse;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "graded" && submission.grade) || 
      (filterStatus === "not-graded" && !submission.grade);
    return matchesCourse && matchesStatus;
  });

  return (
   
        <MaxWidthWrapper className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Assignment Submissions</h1>
            <div className="flex items-center gap-3">
              <Select onValueChange={setFilterCourse} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title.split("-").join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                  <SelectItem value="not-graded">Not Graded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSubmissions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Submitted At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.user.name}</TableCell>
                        <TableCell>{submission.project.course.title.split("-").join(" ")}</TableCell>
                        <TableCell>{submission.project.title}</TableCell>
                        <TableCell>{submission.grade ? `${submission.grade}%` : "Not graded"}</TableCell>
                        <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="hover:bg-green-600 hover:text-white"
                          >
                            <Link href={`/tutor/courses/${submission.project.courseId}/assignments/submissions/${submission.id}`}>
                          Grade / View Details
                          </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-600 text-center">No assignment submissions found.</p>
              )}
            </CardContent>
          </Card>
        </MaxWidthWrapper>
  );
}