import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchTutorById } from "@/actions/tutor";

export function AdminCourseCard({ course }: { course: Course }) {
  const [tutor, setTutor] = useState<{ image: string; name: string } | null>(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        console.log('Fetching tutor data for ID:', course.tutorId);
        const tutorData = await fetchTutorById(course.tutorId);
        console.log('Fetched tutor data:', tutorData);

        if (tutorData) {
          setTutor(tutorData);
        } else {
          console.warn('No tutor data found for ID:', course.tutorId);
        }
      } catch (error) {
        console.error('Error fetching tutor:', error);
      }
    };

    fetchTutor();
  }, [course.tutorId]);

  console.log('Tutor state:', tutor);

  const timeLeft = `${course.classDays.split("---").length} Days`;
  const duration = course.duration;
  const courseTitle = course.title.split("-").join(" ");
  const courseDescription = course.description;
  const courseSlug = course.title;
  const isBought = true;

  return (
    <Card>
      <CardContent>
        <div className="my-4 flex items-center justify-between">
          <div className="h-[50px] w-[50px]">
            {tutor && (
              <Image
                width={200}
                height={200}
                src={tutor.image || 'PalmTechnIQ'}
                alt={tutor.name || 'PalmTechnIQ'}
                className="object-cover rounded-full"
              />
            )}
          </div>
          <div className="text-gray-500">{tutor?.name}</div>
        </div>

        <h3 className="mb-2 text-xl font-bold capitalize">
          {courseTitle}
        </h3>
        <p className="mb-4 line-clamp-2 text-gray-500">
          {courseDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">{duration}</span>
          </div>
          {!isBought && (
            <Button asChild size="sm">
              <Link href={`/courses/${courseSlug}/pay`}>
                Enroll
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
