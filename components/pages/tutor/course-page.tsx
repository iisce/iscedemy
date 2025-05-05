'use client';

import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatToNaira } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export default function CoursesPage({
  tutor,
  courses,
  enrollments,
  earnings,
  curriculumStatus,
}: {
  tutor: any;
  courses: any[];
  enrollments: { [key: string]: number };
  earnings: { [key: string]: number };
  curriculumStatus: { [key: string]: boolean };
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    setShowInput((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const filteredCourses = useMemo(() => {
    let sortedCourses = [...courses];

    if (sortBy === "enrollments") {
      sortedCourses.sort((a, b) => (enrollments[b.id] || 0) - (enrollments[a.id] || 0));
    } else if (sortBy === "earnings") {
      sortedCourses.sort((a, b) => (earnings[b.id] || 0) - (earnings[a.id] || 0));
    } else {
      sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sortedCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm, sortBy, enrollments, earnings]);

  return (
        <MaxWidthWrapper className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">My Courses</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <SearchIcon
                  onClick={handleSearchIconClick}
                  className="absolute right-4 md:left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-md border border-green-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                    showInput ? "block" : "hidden"
                  } md:block`}
                  ref={inputRef}
                />
              </div>
              <Select onValueChange={setSortBy} defaultValue="title">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="enrollments">Enrollments</SelectItem>
                  <SelectItem value="earnings">Earnings</SelectItem>
                </SelectContent>
              </Select>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/tutor#course-creation">Create New Course</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="capitalize">{course.title.split("-").join(" ")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{course.description}</p>
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Virtual Price:</span>
                        <span className="font-bold text-green-600">{formatToNaira(course.virtualPrice)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Physical Price:</span>
                        <span className="font-bold text-green-600">{formatToNaira(course.physicalPrice)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Enrollments:</span>
                        <span className="font-bold text-green-600">{enrollments[course.id] || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Earnings:</span>
                        <span className="font-bold text-green-600">{formatToNaira((earnings[course.id] || 0) / 100)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="grid space-y-2 gap-3">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full hover:bg-green-600 hover:text-white"
                    >
                      <Link href={`/tutor/courses/${course.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full hover:bg-green-600 hover:text-white"
                    >
                      <Link href={`/tutor#course-edit-${course.id}`}>
                        Edit Course
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full hover:bg-green-600 hover:text-white"
                    >
                      <Link href={`/tutor/courses/${course.id}/curriculum/create`}>
                        {curriculumStatus[course.id] ? "Update Curriculum" : "Create Curriculum"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">No courses found. Create a new course to get started!</p>
            )}
          </div>
        </MaxWidthWrapper>
  );
}