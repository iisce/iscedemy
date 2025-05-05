import { auth } from "@/auth";
import { CoursePaid } from "@/components/component/student/course-paid";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { getCourseById } from "@/data/course";
import { getAllCurriculumByCourseId } from "@/data/curriculum";
import { getUserById } from "@/data/user";
import { getProgressByStudentAndCourse, getTotalLessonsByCourse } from "@/data/progress";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Courses',
  description: 'View and manage all your enrolled courses on PalmTechnIQ.',
  metadataBase: new URL('https://www.palmtechniq.com/courses'),
  alternates: {
    canonical: '/courses',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'My Courses',
    description: 'View and manage all your enrolled courses on PalmTechnIQ.',
    url: 'https://www.palmtechniq.com/courses',
    siteName: 'PalmTechnIQ',
    images: '/innovation.jpg'
  }
}

export default async function StudentCoursesPage() {
  const session = await auth();

  if (!session?.user || session?.user?.role !== 'STUDENT') {
    redirect('/login');
    return null;
  }

  const student = await getUserById(session.user.id ?? "");
  const paidCourses = student?.courses?.split("---") || [];

  // Pre-fetch course, curriculum, tutor, and progress data
  const paidCourseData = await Promise.all(
    paidCourses.map(async (id) => {
      const currentCourse = await getCourseById(id);
      const curriculum = await getAllCurriculumByCourseId(id);
      const tutor = currentCourse?.tutorId ? await getUserById(currentCourse.tutorId) : null;

      // Get total lessons for the course
      const totalLessons = await getTotalLessonsByCourse(id);

      // Get completed lessons for the course
      const progress = await getProgressByStudentAndCourse(student?.id ?? "", id);
      // Deduplicate progress entries by lesson ID and filter for completed lessons
      const uniqueProgress = Array.from(new Set(progress.map(p => p.lessonId)))
        .map(lessonId => progress.find(p => p.lessonId === lessonId)!);
      const completedLessons = uniqueProgress.filter(p => p.completed).length; // Count only lessons with completed: true
      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      // Simulate last accessed date (replace with actual data later)
      const lastAccessed = new Date();
      lastAccessed.setDate(lastAccessed.getDate() - (paidCourses.length - paidCourses.indexOf(id)));

      // Log values for debugging
      console.log(`Course: ${currentCourse?.title}, Total Lessons: ${totalLessons}, Completed Lessons: ${completedLessons}, Progress: ${progressPercentage}%`);

      return {
        course: currentCourse,
        curriculum: Array.isArray(curriculum) ? curriculum : curriculum ? [curriculum] : [],
        tutorName: tutor?.name || "Unknown Instructor",
        lastAccessed: lastAccessed.toISOString().split('T')[0],
        totalLessons,
        completedLessons,
        progressPercentage,
      };
    })
  );

  return (
    <MaxWidthWrapper className="py-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Courses</h1>
      {paidCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paidCourseData.map((data, index) => (
            <CoursePaid
              key={index}
              title={data.course!.title}
              curriculum={data.curriculum}
              duration={data.course!.duration}
              progressPercentage={data.progressPercentage}
              instructorName={data.tutorName}
              lastAccessed={data.lastAccessed}
              totalLessons={data.totalLessons}
              completedLessons={data.completedLessons}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-500">You haven’t enrolled in any courses yet. <a href="/student" className="text-teal-500 underline">Explore courses</a> to get started!</div>
      )}
    </MaxWidthWrapper>
  );
}