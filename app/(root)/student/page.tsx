import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCourses, getCourseById } from "@/data/course";
import { getAllCurriculumByCourseId } from "@/data/curriculum";
import { getUserById } from "@/data/user";
import { cn } from "@/lib/utils";
import { Curriculum } from "@prisma/client";
import { BookIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export function Badge({
     children,
     variant,
}: {
     children: ReactNode;
     variant: "blue-purple" | "green-teal" | "yellow-orange";
}) {
     const bluePurpleClasses = "from-blue-500 to-purple-500";
     const greenTealClasses = "from-green-500 to-teal-600";
     const yellowOrangeClasses = "from-yellow-500 to-orange-500";

     return (
          <div
               className={cn(
                    "rounded-full bg-gradient-to-r px-3 py-1 text-sm text-white",
                    variant === "blue-purple" && bluePurpleClasses,
                    variant === "green-teal" && greenTealClasses,
                    variant === "yellow-orange" && yellowOrangeClasses,
               )}
          >
               {children}
          </div>
     );
}

export function CourseCard({
     badgeText,
     courseId,
     courseSlug,
     courseTitle,
     courseDescription,
     timeLeft,
     duration,
     variant,
     isBought,
}: {
     badgeText?: string;
     timeLeft: string;
     duration: string;
     courseTitle: string;
     courseDescription: string;
     courseId?: string;
     courseSlug: string;
     variant: "blue-purple" | "green-teal" | "yellow-orange";
     isBought?: boolean;
}) {
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

export function CoursePaid({
     title,
     curriculum,
}: {
     title: string;
     curriculum?: Curriculum[];
}) {
     return (
          <Card>
               <CardContent>
                    <div className="my-4 flex items-center justify-between">
                         <h3 className="text-xl font-bold capitalize">
                              {title.split("-").join(" ")}
                         </h3>
                    </div>
                    <div className="flex items-center justify-between">
                         <Button variant="outline" size="sm" asChild>
                              <Link href={`/courses/${title}?tab=curriculum`}>
                                   Resume
                              </Link>
                         </Button>
                         <div className="flex items-center gap-2">
                              <BookIcon className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-500">
                                   {curriculum?.length} lessons
                              </span>
                         </div>
                    </div>
               </CardContent>
          </Card>
     );
}

export default async function StudentDashboard() {
     const session = await auth();
     const student = await getUserById(session?.user?.id ?? "");
     const courses = await getAllCourses();
     const paidCourses = student?.courses?.split("---");

     return (
          <MaxWidthWrapper className="py-6">
               <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold">
                         Purchased Course
                    </h2>
                    {paidCourses && paidCourses.length > 0 ? (
                         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                              {paidCourses.map(async (id, b) => {
                                   const currentCourse =
                                        await getCourseById(id);
                                   const curriculum =
                                        await getAllCurriculumByCourseId(id);
                                   return (
                                        <CoursePaid
                                             title={currentCourse!.title}
                                             curriculum={curriculum}
                                             key={b}
                                        />
                                   );
                              })}
                         </div>
                    ) : (
                         <div>No courses purchased yet</div>
                    )}
               </section>
               <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold">All Courses</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                         {courses.map((course, b) => (
                              <CourseCard
                                   key={b}
                                   timeLeft={`${
                                        course.classDays.split("---").length
                                   } Days`}
                                   duration={course.duration}
                                   courseTitle={course.title
                                        .split("-")
                                        .join(" ")}
                                   courseDescription={course.description}
                                   courseId={""}
                                   courseSlug={course.title}
                                   variant={"green-teal"}
                                   badgeText="HOT"
                                   isBought={paidCourses?.includes(course.id)}
                              />
                         ))}
                    </div>
               </section>
               {/* <section>
				<h2 className='text-2xl font-bold mb-4'>
					Course Recommendations
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					<Card>
						<CardContent>
							<div className='flex items-center justify-between mb-4'>
								<div className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm'>
									Featured
								</div>
								<div className='text-gray-500'>
									4.8 ⭐
								</div>
							</div>
							<h3 className='text-xl font-bold mb-2'>
								Advanced JavaScript Concepts
							</h3>
							<p className='text-gray-500 mb-4'>
								Take your JavaScript skills to the next
								level with this comprehensive course.
							</p>
							<div className='flex items-center justify-between'>
								<Button size='sm'>Enroll</Button>
								<div className='flex items-center gap-2'>
									<ClockIcon className='w-4 h-4 text-gray-500' />
									<span className='text-gray-500'>
										16 hours
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent>
							<div className='flex items-center justify-between mb-4'>
								<div className='bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm'>
									Popular
								</div>
								<div className='text-gray-500'>
									4.6 ⭐
								</div>
							</div>
							<h3 className='text-xl font-bold mb-2'>
								Mastering TypeScript for Enterprise
								Applications
							</h3>
							<p className='text-gray-500 mb-4'>
								Dive deep into TypeScript and learn how
								to build scalable enterprise-level
								applications.
							</p>
							<div className='flex items-center justify-between'>
								<Button size='sm'>Enroll</Button>
								<div className='flex items-center gap-2'>
									<ClockIcon className='w-4 h-4 text-gray-500' />
									<span className='text-gray-500'>
										20 hours
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent>
							<div className='flex items-center justify-between mb-4'>
								<div className='bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm'>
									Trending
								</div>
								<div className='text-gray-500'>
									4.4 ⭐
								</div>
							</div>
							<h3 className='text-xl font-bold mb-2'>
								Serverless Development with AWS Lambda
							</h3>
							<p className='text-gray-500 mb-4'>
								Learn how to build and deploy serverless
								applications using AWS Lambda.
							</p>
							<div className='flex items-center justify-between'>
								<Button size='sm'>Enroll</Button>
								<div className='flex items-center gap-2'>
									<ClockIcon className='w-4 h-4 text-gray-500' />
									<span className='text-gray-500'>
										14 hours
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section> */}
          </MaxWidthWrapper>
     );
}
