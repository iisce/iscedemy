import { auth } from "@/auth";
import FormSuccess from "@/components/form-success";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EnrollButton from "@/components/ui/enroll-button";
import { getCourseBySlug } from "@/data/course";
import { getUserById } from "@/data/user";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function CourseCard({
    badgeText,
    courseId,
    courseSlug,
    courseTitle,
    courseDescription,
    timeLeft,
    duration,
    isBought,
}: {
    badgeText?: string;
    timeLeft: string;
    duration: string;
    courseTitle: string;
    courseDescription: string;
    courseId?: string;
    courseSlug: string;
    isBought?: boolean;
}) {
     const session = await auth();
	const user = session?.user;
     const courseDetails = await getCourseBySlug(courseTitle);
     if (!courseDetails) return notFound();
	const currentUser = await getUserById(user?.id ?? '');

     currentUser?.courses?.includes(courseDetails.id);
	const selectedCourses = currentUser?.courses ? currentUser?.courses.split('---') : [];
	const hasSelectedThreeCourses = selectedCourses.length % 3 === 0;



    return (
         <Card>
              <CardContent>
                   <div className="my-4 flex items-center justify-between">
                        <Badge variant='greenTeal'>{badgeText}</Badge>
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
                        {user && (
                         <div className="space-y-2">
                              {isBought && (
                                   <div className="">
                                        <Button variant='outline' className="text-sm text-emerald-500" disabled>Enrolled</Button>
                                   </div>
                              )}


                              {!isBought && !hasSelectedThreeCourses && (
                                   <div className="grid">
                                        <EnrollButton courseId={courseDetails.id} userId={user.id!}/>
                                   </div>
                              )}

                              {!isBought &&  hasSelectedThreeCourses && (
                              <Button asChild size="sm">
                                   <Link href={`/courses/${courseSlug}/pay`}>
                                        Enroll
                                   </Link>
                              </Button>
                         )}
                         </div>
                         
                        )}
                   </div>
              </CardContent>
         </Card>
    );
}