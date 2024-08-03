import Image from "next/image";
import { Course } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";

interface TutorCardProps {
  tutor: {
    id: string;
    name: string | null;
    description: string | null;
    phone: string | null;
    position: string | null;
    Course: Course[];
    role: string;
    email: string | null;
    image: string | null;
  };
}

export function TutorCard({ tutor }: TutorCardProps) {
  if (!tutor) return <p>Loading...</p>;

  return (
    <Card>
      <CardContent>
        <div className="my-4 flex items-center justify-between">
          <div className="h-[50px] w-[50px]">
            <Image
              width={200}
              height={200}
              src={tutor.image || ''}
              alt={tutor.name || "Tutor Image"}
              className="object-cover rounded-full"
            />
          </div>
          <div className="text-gray-500">{tutor.name}</div>
        </div>

        <h3 className="mb-2 text-xl font-bold capitalize">{tutor.position}</h3>
        <p className="mb-4 line-clamp-2 text-gray-500">{tutor.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">{tutor.email}</span>
          </div>
        </div>
        <h3>Courses:</h3>
        <ul>
          {tutor.Course.map((course) => (
            <li key={course.id}>
              <h4>{course.title}</h4>
              {/* <p className="line-clamp-6">{course.description}</p> */}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
