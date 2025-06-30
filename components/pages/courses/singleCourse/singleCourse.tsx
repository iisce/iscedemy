import { auth } from "@/auth";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/data/course";
import { getAllCurriculumByCourseId } from "@/data/curriculum";
import { getAllModulesByCurriculumId } from "@/data/modules";
import {
     getProgressByStudentAndCourse,
     getTotalLessonsByCourse,
} from "@/data/progress";
import { getAllReviewsByTutorName } from "@/data/reviews";
import { getUserByCourseId, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import * as Icons from "@/lib/icons";
import { extractVideoId, formatToNaira } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";
import { YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CourseRating from "./courseRating";
import { SingleCourseTabs } from "./singleCourseTabs";

export default async function SingleCourse({
     courseTitle,
     tab,
}: {
     courseTitle: string;
     tab?: string;
}) {
     const session = await auth();
     const user = session?.user;

     const currentUser = await getUserById(user?.id ?? "");

     const courseDetails = await getCourseBySlug(courseTitle);
     if (!courseDetails) return notFound();
     const tutor = await getUserById(courseDetails.tutorId);
     if (!tutor) return notFound();

     if (!courseDetails) {
          return (
               <div className="mx-auto my-12 w-full items-center justify-center md:w-1/2">
                    <p>
                         <FormError message="Course not available at the moment! Please check back later" />
                    </p>
               </div>
          );
     }
     const curriculum = await getAllCurriculumByCourseId(courseDetails.id);
     const modules =
          Array.isArray(curriculum) || !curriculum
               ? []
               : await getAllModulesByCurriculumId(curriculum.id);
     const reviews = await getAllReviewsByTutorName(tutor.name!);

     const numberOfRegistration = await getUserByCourseId(courseDetails.id);

     const totalRating = reviews?.reduce(
          (total: number, review: any) => total + review.rating,
          0,
     );

     const progress = user?.id
          ? await getProgressByStudentAndCourse(user.id, courseDetails.id)
          : [];
     const totalLessons = await getTotalLessonsByCourse(courseDetails.id);
     const completedLessons = progress.filter((p) => p.completed).length;
     const progressPercentage =
          totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

     const courseWithDetails = await db.course.findUnique({
          where: { id: courseDetails.id },
          include: {
               mentorships: {
                    where: {
                         menteeId: undefined,
                         scheduledAt: { gt: new Date() },
                    },
                    include: {
                         mentor: true,
                    },
                    orderBy: {
                         scheduledAt: "asc",
                    },
               },

               projects: {
                    include: {
                         submissions: {
                              where: { userId: user?.id },
                         },
                    },
                    orderBy: { createdAt: "desc" },
               },

               Curriculum: {
                    include: {
                         modules: {
                              include: {
                                   lessons: {
                                        orderBy: { order: "asc" },
                                   },
                              },
                              orderBy: { order: "asc" },
                         },
                    },
               },
          },
     });

     if (!courseWithDetails) {
          redirect("/courses");
     }

     const mentorships = courseWithDetails.mentorships;
     const projects = courseWithDetails.projects;
     const lessonIds =
          courseWithDetails.Curriculum?.[0]?.modules?.flatMap((module) =>
               module.lessons.map((lesson) => lesson.id),
          ) || [];
     const progressData = await db.progress.findMany({
          where: {
               userId: user?.id,
               lessonId: {
                    in: lessonIds,
               },
          },
     });
     const progressMap = new Map(progressData.map((p: any) => [p.lessonId, p]));

     const videoId = extractVideoId(courseDetails.videoUrl);

     // Determine if the user has paid and their course selection status
     const isPaid = currentUser?.courses?.includes(courseDetails.id);
     const selectedCourses = currentUser?.courses
          ? currentUser?.courses.split("---")
          : [];
     // const hasSelectedThreeCourses = selectedCourses.length % 3 === 0;
     // console.log({hasSelectedThreeCourses})

     // Determine level based on programType
     const level =
          courseDetails.programType === "CRASH_COURSE"
               ? "Beginner"
               : courseDetails.programType === "THREE_MONTHS"
                 ? "Intermediate"
                 : "Advanced";

     // Progression path
     const nextProgram =
          courseDetails.programType === "CRASH_COURSE"
               ? "Check out our 3-Month Program to advance your skills."
               : courseDetails.programType === "THREE_MONTHS"
                 ? "Ready for more? Explore our 6-Month Program."
                 : "You've completed the advanced program! Build your portfolio.";

     // 	   console.log('Completed Lessons:', completedLessons);
     //   console.log('Total Lessons:', totalLessons);
     //   console.log('Progress Percentage:', progressPercentage);

     return (
          <div className="w-full justify-center bg-white py-5 md:px-6">
               <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    <div className="flex w-full flex-col gap-5 lg:col-span-3">
                         <div className="w-full space-y-2">
                              <h1 className="lg::text-4xl text-wrap text-xl font-bold capitalize md:text-2xl">
                                   {courseDetails.textSnippet?.replace(
                                        "{courseDetails.title}",
                                        decodeURI(courseDetails.title)
                                             .split("-")
                                             .join(" "),
                                   ) ||
                                        `Starting ${courseDetails.title} as your Home
							Based Business`}
                              </h1>
                              <div className="flex items-center space-x-2">
                                   <Badge
                                        variant="secondary"
                                        className="text-green-600"
                                   >
                                        {level} |{" "}
                                        {courseDetails.programType.replace(
                                             "_",
                                             " ",
                                        )}
                                   </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                   <Image
                                        width={50}
                                        height={50}
                                        alt={tutor?.name || "PalmtechnIQ"}
                                        src={tutor?.image || "/placeholder.svg"}
                                        className="rounded-full object-cover"
                                   />

                                   <div className="my-2 flex flex-col space-y-1">
                                        <div className="text-sm font-bold">
                                             {tutor.name}
                                        </div>
                                        <CourseRating tutor={tutor} />
                                   </div>
                              </div>
                              <div className="flex space-x-2 text-sm">
                                   <div className="text-green-600">
                                        <Icons.BookOpenIcon />
                                   </div>
                                   {courseDetails.category && (
                                        <Badge variant={"secondary"}>
                                             {courseDetails.category}
                                        </Badge>
                                   )}
                              </div>
                         </div>

                         {isPaid &&
                              courseDetails.programType !== "CRASH_COURSE" && (
                                   <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200">
                                        <div
                                             className="h-2.5 rounded-full bg-green-600"
                                             style={{
                                                  width: `${progressPercentage}%`,
                                             }}
                                        ></div>
                                        <p className="mt-1 text-sm text-gray-600">{`Progress: ${Math.round(progressPercentage)}%`}</p>
                                   </div>
                              )}
                         <SingleCourseTabs
                              defaultTab={tab || "overview"}
                              user={user}
                              isPaid={isPaid!}
                              modules={modules}
                              progress={progress}
                              tutor={tutor}
                              reviews={reviews!}
                              courseDetails={courseDetails}
                              mentorships={mentorships}
                              projects={projects}
                              progressMap={progressMap}
                         />
                    </div>

                    <div className="flex flex-col gap-5 lg:col-span-2">
                         <div className="aspect-video w-full">
                              {videoId ? (
                                   <YouTubeEmbed
                                        videoid={videoId}
                                        params="controls=1"
                                   />
                              ) : (
                                   <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600">
                                        <p>
                                             Invalid or missing YouTube video
                                             URL
                                        </p>
                                   </div>
                              )}
                         </div>

                         <div className="grid space-y-4">
                              <h3 className="text-lg font-semibold md:text-xl">
                                   Course Includes:
                              </h3>
                              <div className="w-full space-y-4">
                                   <div className="flex flex-row items-center justify-between gap-4">
                                        <span className="flex items-center text-green-600">
                                             <Icons.NairaSignIcon />
                                             {"  "}
                                             Price:
                                        </span>
                                        <div className="font-bold">
                                             <div className="">
                                                  {`Virtual/Physical`}
                                             </div>
                                             <div className="">
                                                  {`${formatToNaira(
                                                       courseDetails.virtualPrice,
                                                  )}/${formatToNaira(
                                                       courseDetails.physicalPrice,
                                                  )}`}
                                             </div>
                                             {/* <p className='text-wrap text-[10px] text-red-600'>{`You'll pay a one-time 15,000 Digital Student ID and 5,000 for. Upon checkout.`}</p> */}
                                        </div>
                                   </div>
                                   <hr />
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-green-600">
                                             <Icons.UserIcon />
                                             <span className="">
                                                  Instructor:
                                             </span>
                                        </div>

                                        <span className="font-bold">
                                             {tutor.name}
                                        </span>
                                   </div>
                                   <hr />
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-green-600">
                                             <Icons.ClockIcon />
                                             <span className="">Duration:</span>
                                        </div>

                                        <span className="font-bold">
                                             {courseDetails.duration}
                                        </span>
                                   </div>
                                   <hr />
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-green-600">
                                             <Icons.BookOpenIcon />
                                             <span className="">Classes:</span>
                                        </div>

                                        <span className="font-bold">
                                             {courseDetails.noOfClass}
                                        </span>
                                   </div>
                                   <hr />
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-green-600">
                                             <Icons.UsersIcon />
                                             <span className="">Students:</span>
                                        </div>
                                        <span className="font-bold">
                                             {numberOfRegistration?.length ?? 0}
                                        </span>
                                   </div>
                                   <hr />
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-green-600">
                                             <Icons.GlobeIcon />
                                             <span className="">Language:</span>
                                        </div>

                                        <span className="ml-0 font-bold">
                                             {"English"}
                                        </span>
                                   </div>
                                   <hr />
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-green-600">
                                             <Icons.BadgeCheckIcon />
                                             <span className="">
                                                  Certifications:
                                             </span>
                                        </div>

                                        <span className="font-bold">
                                             {courseDetails.certificate
                                                  ? "Yes"
                                                  : "No"}
                                        </span>
                                   </div>
                              </div>
                              <hr />
                              {user && (
                                   <div className="space-y-2">
                                        {isPaid && (
                                             <div className="text-sm text-gray-500">
                                                  <FormSuccess message="You are enrolled in this course" />
                                             </div>
                                        )}
                                        {/* Check if user has selected three courses */}
                                        {/* {!isPaid  && (
									<div className='grid'>
									<EnrollButton courseId={courseDetails.id} userId={user.id!} />
									</div>
								)} */}
                                        {/* This checks if a user hasn't taken any course yet and allows them error for a course after check  */}
                                        {!isPaid && (
                                             <div className="grid">
                                                  <Button
                                                       asChild
                                                       className="rounded-full"
                                                  >
                                                       <Link
                                                            href={`/courses/${courseDetails.title}/pay`}
                                                       >
                                                            Enroll Now
                                                       </Link>
                                                  </Button>
                                             </div>
                                        )}

                                        <div className="mt-4">
                                             <p className="text-sm text-gray-600">
                                                  {nextProgram}
                                             </p>
                                             {courseDetails.programType !==
                                                  "SIX_MONTHS" && (
                                                  <Button
                                                       asChild
                                                       variant="outline"
                                                  >
                                                       <Link
                                                            href={`/courses?=${courseDetails.programType === "CRASH_COURSE" ? "THREE_MONTHS" : "SIX_MONTHS"}`}
                                                       >
                                                            Explore Next Program
                                                       </Link>
                                                  </Button>
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>
                         <div className="px-4 md:px-0">
                              <h3 className="text-lg font-semibold md:text-xl">
                                   Share On:
                              </h3>
                              <div className="mt-4 flex flex-row space-x-2">
                                   <div className="mt-4 flex space-x-2 text-white">
                                        <Link href="https://www.facebook.com/">
                                             <Button className="rounded-full bg-blue-500 p-2 text-white hover:bg-green-600">
                                                  <Icons.FacebookIcon />
                                             </Button>
                                        </Link>
                                        <Link href="https://www.twitter.com">
                                             <Button className="rounded-full bg-blue-300 p-2 text-white hover:bg-green-600">
                                                  <Icons.TwitterIcon />
                                             </Button>
                                        </Link>
                                        <Link href="https://www.linkedin.com/">
                                             <Button className="rounded-full bg-blue-700 p-2 text-white hover:bg-green-600">
                                                  <Icons.LinkedinIcon />
                                             </Button>
                                        </Link>
                                        <Link href="https://www.youtube.com/@isceapp">
                                             <Button className="rounded-full bg-blue-700 p-2 text-white hover:bg-green-600">
                                                  <YoutubeIcon />
                                             </Button>
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
