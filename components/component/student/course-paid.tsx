import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Curriculum } from "@prisma/client";
import { BookIcon, ClockIcon, CalendarIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export function CoursePaid({
  title,
  curriculum,
  duration,
  progressPercentage,
  instructorName,
  lastAccessed,
  totalLessons,
  completedLessons,
}: {
  title: string;
  curriculum?: Curriculum[];
  duration?: string;
  progressPercentage?: number;
  instructorName?: string;
  lastAccessed?: string;
  totalLessons?: number;
  completedLessons?: number;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold capitalize text-gray-800">
            {title.split("-").join(" ")}
          </h3>
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage || 0}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {progressPercentage || 0}% Complete ({completedLessons || 0}/{totalLessons || 0} Lessons)
          </p>
        </div>
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">Instructor: {instructorName || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">Last Accessed: {lastAccessed || "Not yet accessed"}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">{duration || "Not specified"}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">{totalLessons || 0} lessons</span>
          </div>
        </div>
        <Button variant="default" size="sm" asChild className="w-full bg-green-500 hover:bg-green-600">
          <Link href={`/courses/${title}?tab=curriculum`}>
            Continue Learning
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}