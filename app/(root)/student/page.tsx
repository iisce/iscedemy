import { auth } from "@/auth";
import { CoursePaid } from "@/components/component/student/course-paid";
import { CourseCard } from "@/components/component/student/student-card";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { getAllCourses, getCourseById } from "@/data/course";
import { getAllCurriculumByCourseId } from "@/data/curriculum";
import { getUserById } from "@/data/user";
import { getProgressByStudentAndCourse, getTotalLessonsByCourse } from "@/data/progress";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'Stay in-charge of your courses and monitor your learning process!',
  metadataBase: new URL('https://www.palmtechniq.com/student'),
  alternates: {
    canonical: '/student',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Student Dashboard',
    description: 'Stay in-charge of your courses and monitor your learning process!',
    url: 'https://www.palmtechniq.com/student',
    siteName: 'PalmTechnIQ',
    images: '/innovation.jpg'
  }
}

export default async function StudentDashboard() {
  const session = await auth();

  if (!session?.user || session?.user?.role !== 'STUDENT') {
    redirect('/login');
    return null;
  }

  const student = await getUserById(session.user.id ?? "");
  const courses = await getAllCourses();
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

  // Calculate overall progress
  const totalLessons = paidCourseData.reduce((sum, data) => sum + (data.totalLessons || 0), 0);
  const completedLessons = paidCourseData.reduce((sum, data) => sum + (data.completedLessons || 0), 0);
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const hoursSpent = paidCourses.length * 5; // Example: 5 hours per course
  const certificatesEarned = paidCourses.length > 0 ? Math.floor(paidCourses.length * 0.5) : 0;

  return (
    <MaxWidthWrapper className="py-6">
      <section className="mb-8 bg-gradient-to-r from-green-500 to-black text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="mt-2 text-lg">Track your learning journey and explore new courses.</p>
        {paidCourses.length > 0 ? (
          <>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Overall Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-green-400 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="mt-1 text-sm">{progressPercentage}% Complete ({completedLessons}/{totalLessons} Lessons)</p>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-300">📚</span>
                <span>Total Lessons: {totalLessons}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-300">⏰</span>
                <span>Hours Spent: {hoursSpent}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-300">🏆</span>
                <span>Certificates Earned: {certificatesEarned}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm">Get started by enrolling in a course below!</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Purchased Courses</h2>
        {paidCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paidCourseData.map((data, index) => (
              <CoursePaid
                key={index}
                title={data.course!.title}
                curriculum={data.curriculum}
                progressPercentage={data.progressPercentage}
                duration={data.course!.duration}
                instructorName={data.tutorName}
                lastAccessed={data.lastAccessed}
                totalLessons={data.totalLessons}
                completedLessons={data.completedLessons}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No courses purchased yet</div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Explore All Courses</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              timeLeft={`${course.classDays.split("---").length} Days`}
              duration={course.duration}
              courseTitle={course.title.split("-").join(" ")}
              courseDescription={course.description}
              courseId={course.id}
              courseSlug={course.title}
              badgeText="HOT"
              isBought={paidCourses.includes(course.id)}
            />
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  );
}