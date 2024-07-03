import { Badge } from "@/app/(root)/student/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Link from "next/link";

export function AdminCourseCard({ course }: { course: Course }) {
     const timeLeft = `${course.classDays.split("---").length} Days`;
     const duration = course.duration;
     const courseTitle = course.title.split("-").join(" ");
     const courseDescription = course.description;
     const courseId = "";
     const courseSlug = course.title;
     const variant = "green-teal";
     const badgeText = "HOT";
     const isBought = true;

     return (
          <Card>
               <CardContent>
                    <div className="my-4 flex items-center justify-between">
                         <Badge variant={variant}>{badgeText}</Badge>
                         <div className="text-gray-500">{timeLeft}</div>
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
