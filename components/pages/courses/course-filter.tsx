'use client';

import CourseList from "@/components/pages/courses/courselist";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface CourseFilterProps {
  courses: any[];
}

export default function CourseFilter({ courses }: CourseFilterProps) {
  const [filteredCourses, setFilteredCourses] = useState<any[]>(courses);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.programType === filter));
    }
  }, [filter, courses]);

  return (
    <div className="mb-6 mt-6">
      {/* Filter Bar */}
      <div className="flex space-x-4 mb-4">
        <Button 
          className={`px-4 py-2 rounded-full ${filter === 'ALL' ? 'bg-gray-400' : 'bg-primary'} hover:bg-gray-300`}
          onClick={() => setFilter('ALL')}
        >
          All Courses
        </Button>
        <Button 
          className={`px-4 py-2 rounded-full ${filter === 'CRASH_COURSE' ? 'bg-gray-400' : 'bg-primary'} hover:bg-gray-300`}
          onClick={() => setFilter('CRASH_COURSE')}
        >
          Crash Courses
        </Button>
        <Button 
          className={`px-4 py-2 rounded-full ${filter === 'THREE_MONTHS' ? 'bg-gray-400' : 'bg-primary'} hover:bg-gray-300`}
          onClick={() => setFilter('THREE_MONTHS')}
        >
          3-Month Programs
        </Button>
        <Button 
          className={`px-4 py-2 rounded-full ${filter === 'SIX_MONTHS' ? 'bg-gray-400' : 'bg-primary'} hover:bg-gray-300`}
          onClick={() => setFilter('SIX_MONTHS')}
        >
          6-Month Programs
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((value, k) => (
          <CourseList
            key={k}
            image={value.image}
            content={value.overView ?? ""}
            title={value.title.split("-").join(" ")}
            link={`/courses/${value.title}`}
            programType={value.programType}
            duration={value.duration}
            virtualPrice={value.virtualPrice}
          />
        ))}
      </div>
    </div>
  );
}