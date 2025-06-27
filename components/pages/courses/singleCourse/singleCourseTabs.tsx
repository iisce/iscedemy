"use client";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleCourseCurriculum from "./singleCourseCurriculum";
import TutorProfile from "@/components/component/tutor/tutor-profile";
import { SingleTutorReviews } from "@/components/component/tutor/tutor-reviews";
import { MentorshipSection } from "@/components/component/tutor/mentorship";
import { ProjectsSection } from "@/components/component/student/project-section";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/ui/sign-out";
import Link from "next/link";
import { MobileTabs } from "./mobile-tabs";

interface SingleCourseTabsProps {
     defaultTab: string;
     user: any;
     isPaid: boolean;
     modules: any[];
     progress: any[];
     tutor: any;
     reviews: any[];
     courseDetails: any;
     mentorships: any[];
     projects: any[];
     progressMap: Map<any, any>;
}

export function SingleCourseTabs({
     defaultTab,
     user,
     isPaid,
     modules,
     progress,
     tutor,
     reviews,
     courseDetails,
     mentorships,
     projects,
     progressMap,
}: SingleCourseTabsProps) {
     const [activeTab, setActiveTab] = useState(defaultTab);

     return (
          <Tabs
               className="mx-auto w-full items-center justify-center"
               value={activeTab}
               onValueChange={setActiveTab}
          >
               <div className="relative w-full">
                    {/* Tabs for Desktop/Tablet */}
                    <div className="hidden sm:block">
                         <ScrollArea className="w-full">
                              <TabsList className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1 sm:grid-cols-4 md:grid-cols-6">
                                   <TabsTrigger value="overview">
                                        Overview
                                   </TabsTrigger>
                                   <TabsTrigger value="curriculum">
                                        Curriculum
                                   </TabsTrigger>
                                   <TabsTrigger value="instructor">
                                        Instructor
                                   </TabsTrigger>
                                   <TabsTrigger value="reviews">
                                        Reviews
                                   </TabsTrigger>
                                   <TabsTrigger value="mentorship">
                                        Mentorship
                                   </TabsTrigger>
                                   <TabsTrigger value="projects">
                                        Projects
                                   </TabsTrigger>
                              </TabsList>
                              <ScrollBar orientation="horizontal" />
                         </ScrollArea>
                    </div>
                    {/* Tabs for Mobile */}
                    <div className="sm:hidden">
                         <TabsList className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
                              <TabsTrigger value="overview">
                                   Overview
                              </TabsTrigger>
                              <TabsTrigger value="curriculum">
                                   Curriculum
                              </TabsTrigger>
                              <TabsTrigger value="instructor">
                                   Instructor
                              </TabsTrigger>
                         </TabsList>
                         <MobileTabs
                              onTabChange={setActiveTab}
                              activeTab={activeTab}
                         />
                    </div>
               </div>
               <TabsContent value="overview">
                    <div className="text-wrap">
                         <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
                              Course Description
                         </h2>
                         <p className="mt-4 text-gray-700">
                              {courseDetails.description}
                         </p>
                         <h3 className="mt-6 text-base font-semibold md:text-lg lg:text-xl">
                              What You'll Learn?
                         </h3>
                         <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
                              {courseDetails.summary
                                   .split("---")
                                   .map((summaryList: string, i: number) => (
                                        <li key={i}>{summaryList}</li>
                                   ))}
                         </ul>
                         <p className="mt-4 text-gray-700">
                              {courseDetails.conclusion}
                         </p>
                    </div>
               </TabsContent>
               <TabsContent value="curriculum">
                    {user && isPaid ? (
                         <SingleCourseCurriculum
                              modules={modules}
                              progress={progress}
                         />
                    ) : !isPaid ? (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Enroll for this course to get complete
                                   access!
                              </p>
                              <Button asChild>
                                   <Link
                                        href={`/courses/${courseDetails.title}/pay`}
                                   >
                                        Enroll Now
                                   </Link>
                              </Button>
                         </div>
                    ) : (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Please sign in to see this page content
                              </p>
                              <SignOutButton />
                         </div>
                    )}
               </TabsContent>
               <TabsContent value="instructor">
                    {user && isPaid ? (
                         <TutorProfile
                              tutorName={tutor.name ?? "Tutor"}
                              highestAverageRating={
                                   reviews?.reduce(
                                        (total: number, review: any) =>
                                             total + review.rating,
                                        0,
                                   ) ?? 0
                              }
                         />
                    ) : !isPaid ? (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Enroll for this course to get complete
                                   access!
                              </p>
                              <Button asChild>
                                   <Link
                                        href={`/courses/${courseDetails.title}/pay`}
                                   >
                                        Enroll Now
                                   </Link>
                              </Button>
                         </div>
                    ) : (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Please sign in to see this page content
                              </p>
                              <SignOutButton />
                         </div>
                    )}
               </TabsContent>
               <TabsContent value="reviews">
                    {user && isPaid ? (
                         <SingleTutorReviews
                              reviews={reviews ?? []}
                              tutor={tutor}
                              courseId={courseDetails.id}
                         />
                    ) : !isPaid ? (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Enroll for this course to get complete
                                   access!
                              </p>
                              <Button asChild>
                                   <Link
                                        href={`/courses/${courseDetails.title}/pay`}
                                   >
                                        Enroll Now
                                   </Link>
                              </Button>
                         </div>
                    ) : (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Please sign in to see this page content
                              </p>
                              <SignOutButton />
                         </div>
                    )}
               </TabsContent>
               <TabsContent value="mentorship">
                    {user && isPaid ? (
                         <MentorshipSection
                              params={{ courseId: courseDetails.id }}
                              mentorships={mentorships}
                         />
                    ) : !isPaid ? (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Enroll for this course to get complete
                                   access!
                              </p>
                              <Button asChild>
                                   <Link
                                        href={`/courses/${courseDetails.title}/pay`}
                                   >
                                        Enroll Now
                                   </Link>
                              </Button>
                         </div>
                    ) : (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Please sign in to see this page content
                              </p>
                              <SignOutButton />
                         </div>
                    )}
               </TabsContent>
               <TabsContent value="projects">
                    {user && isPaid ? (
                         <ProjectsSection
                              params={{ courseId: courseDetails.id }}
                              projects={projects}
                              progressMap={progressMap}
                         />
                    ) : !isPaid ? (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Enroll for this course to get complete
                                   access!
                              </p>
                              <Button asChild>
                                   <Link
                                        href={`/courses/${courseDetails.title}/pay`}
                                   >
                                        Enroll Now
                                   </Link>
                              </Button>
                         </div>
                    ) : (
                         <div className="mx-auto items-center justify-center text-center">
                              <p className="py-10 text-base">
                                   Please sign in to see this page content
                              </p>
                              <SignOutButton />
                         </div>
                    )}
               </TabsContent>
          </Tabs>
     );
}
