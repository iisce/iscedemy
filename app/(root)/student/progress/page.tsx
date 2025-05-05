import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { getUserById } from "@/data/user";
import { getCourseById } from "@/data/course";
import { getAllCurriculumByCourseId } from "@/data/curriculum";
import { getProgressByStudentAndCourse, getTotalLessonsByCourse } from "@/data/progress";
import { getSubmissionsByStudentAndCourse } from "@/data/project-submission";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function StudentProgressPage() {
  const session = await auth();

  if (session?.user?.role !== "STUDENT") {
    redirect("/unauthorized");
    return null;
  }

  const student = await getUserById(session?.user?.id ?? "");
  const paidCourses = student?.courses?.split("---") || [];

  // Fetch mentorship sessions
  const mentorships = await db.mentorship.findMany({
    where: {
      menteeId: student?.id,
    },
  });
  const attendedMentorships = mentorships.filter((m) => m.completed).length;
  const upcomingMentorships = mentorships.filter(
    (m) => !m.completed && m.scheduledAt > new Date()
  ).length;

  // Fetch progress for each course
  const courseProgress = await Promise.all(
    paidCourses.map(async (courseId) => {
      const course = await getCourseById(courseId);
      const curriculum = await getAllCurriculumByCourseId(courseId) as { modules: { id: string; duration: string; createdAt: Date; updatedAt: Date; curriculumId: string; headingNumber: string; headingName: string; headingDescription: string; order: number; lessons?: { id: string; title: string; }[]; }[] };
      const progress = await getProgressByStudentAndCourse(student?.id ?? "", courseId);
      const submissions = await getSubmissionsByStudentAndCourse(student?.id ?? "", courseId);
      const totalLessons = await getTotalLessonsByCourse(courseId);

      // Calculate total lessons and completed lessons

      const completedLessons = progress.filter((p) => p.completed).length;
      const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      // console.log(`Course: ${course?.title}`);
      // console.log('Progress Records:', progress);
      // console.log('Completed Lessons:', completedLessons);
      // console.log('Total Lessons:', totalLessons);
      // console.log('Completion Percentage:', completionPercentage);

      // Group lessons by module for detailed breakdown
      const moduleProgress = curriculum?.modules?.map((module) => {
        const moduleLessons = module.lessons || [];
        const completedInModule = progress.filter(
          (p) => p.completed && moduleLessons.some((lesson) => lesson.id === p.lessonId)
        ).length;
        const moduleCompletionPercentage = moduleLessons.length > 0 ? (completedInModule / moduleLessons.length) * 100 : 0;
        return {
          moduleName: module.headingName,
          totalLessons: moduleLessons.length,
          completedLessons: completedInModule,
          completionPercentage: moduleCompletionPercentage,
        };
      }) || [];

      // Calculate assignment metrics
      const totalAssignments = await db.project.count({ where: { courseId } });
      const submittedAssignments = submissions.length;
      const averageGrade = submissions.length > 0
        ? submissions.reduce((acc, sub) => acc + (parseFloat(sub.grade || "0") || 0), 0) / submissions.length
        : 0;

      return {
        courseId,
        courseTitle: course?.title.split("-").join(" "),
        completionPercentage,
        totalLessons,
        completedLessons,
        moduleProgress,
        totalAssignments,
        submittedAssignments,
        averageGrade,
      };
    })
  );

  // Calculate achievements
  const achievements = [];
  if (courseProgress.some((cp) => cp.completionPercentage >= 50)) {
    achievements.push("Completed 50% of a Course");
  }
  if (courseProgress.some((cp) => cp.completionPercentage === 100)) {
    achievements.push("Completed a Course");
  }
  if (attendedMentorships >= 5) {
    achievements.push("Attended 5 Mentorship Sessions");
  }
  if (courseProgress.some((cp) => cp.averageGrade >= 80)) {
    achievements.push("Achieved 80% Average Grade in Assignments");
  }

  return (
        <MaxWidthWrapper className="py-6">
          <h1 className="text-2xl font-bold mb-6">Progress Tracking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {courseProgress.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {courseProgress.map((course, index) => (
                      <AccordionItem key={index} value={`course-${index}`}>
                        <AccordionTrigger>
                          <div className="flex items-center justify-between w-full pr-4">
                            <span>{course.courseTitle}</span>
                            <span>{Math.round(course.completionPercentage)}% Complete</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-2">
                                {course.completedLessons} / {course.totalLessons} lessons completed
                              </p>
                              <ProgressBar value={course.completionPercentage} className="w-full" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Module Breakdown</h4>
                              {course.moduleProgress.length > 0 ? (
                                course.moduleProgress.map((module, idx) => (
                                  <div key={idx} className="mb-2">
                                    <p className="text-sm">{module.moduleName}</p>
                                    <p className="text-xs text-gray-500 mb-1">
                                      {module.completedLessons} / {module.totalLessons} lessons completed
                                    </p>
                                    <ProgressBar value={module.completionPercentage} className="w-full" />
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">No modules available.</p>
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p>No courses enrolled yet.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  Total Courses Enrolled: <span className="font-semibold">{paidCourses.length}</span>
                </p>
                <p className="mb-2">
                  Attended Mentorships: <span className="font-semibold">{attendedMentorships}</span>
                </p>
                <p className="mb-2">
                  Upcoming Mentorships: <span className="font-semibold">{upcomingMentorships}</span>
                </p>
                <p>
                  Total Assignments Submitted:{' '}
                  <span className="font-semibold">
                    {courseProgress.reduce((acc, cp) => acc + cp.submittedAssignments, 0)}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {courseProgress.length > 0 ? (
                  courseProgress.map((course, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
                      <p className="text-sm text-gray-500">
                        {course.submittedAssignments} / {course.totalAssignments} assignments submitted
                      </p>
                      <p className="text-sm text-gray-500">
                        Average Grade: {course.averageGrade ? `${Math.round(course.averageGrade)}%` : "Not graded"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No assignments available.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {achievements.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {achievements.map((achievement, index) => (
                      <Badge key={index} variant="greenTeal">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p>No achievements yet. Keep learning to earn badges!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </MaxWidthWrapper>
  );
}