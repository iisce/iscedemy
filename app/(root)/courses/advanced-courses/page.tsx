import CourseList from "@/components/pages/courses/courselist";
import Pagination from "@/components/shared/pagination";
import { getAllCourses } from "@/data/course";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:{
    absolute:  'Advanced Courses (6-Month Programs) - PalmTechnIQ',
},
description: 'Become an expert with our 6-Month Advanced Courses at PalmTechnIQ. Gain professional-level skills through comprehensive training, projects, and mentorship.',
metadataBase: new URL('https://www.palmtechniq.com/courses/advanced-courses'),
alternates:{
  canonical: '/courses/advanced-courses',
  languages: {
    'en-US':'/en-US',
    'de-DE': '/de-DE',
  },
},
openGraph: {
  title: {
    absolute: 'Advanced Courses (6-Month Programs) - PalmTechnIQ',
  },
  description: 'Become an expert with our 6-Month Advanced Courses at PalmTechnIQ. Gain professional-level skills through comprehensive training, projects, and mentorship.',
  url: 'https://www.palmtechniq.com/courses/advanced-courses',
  siteName: 'PalmTechnIQ',
  images: '/jopwe.jpg'
}
};

interface AdvancedCoursesPageProps {
    searchParams: { page?: string };
  }
  

export default async function AdvancedCoursesPage({searchParams}: AdvancedCoursesPageProps) {
  const courses = await getAllCourses();
  const advancedCourses = courses.filter(course => course.programType === "SIX_MONTHS");

  const page = parseInt(searchParams.page || "1", 6);
  const coursesPerPage = 6;
  const totalPages = Math.ceil(advancedCourses.length / coursesPerPage);
  const startIndex = (page - 1) * coursesPerPage;
  const paginatedCourses = advancedCourses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <main className="flex flex-col items-center justify-center lg:w-[83%] mx-auto pb-3">
        <nav className="w-full mt-4 font-bold text-sm text-green-600 py-3">
        <Link href="/" className="hover:underline">Home</Link> &gt; {" "}
        <Link href="/courses" className="hover:underline">Courses</Link> &gt; Advanced Courses
      </nav>
      {/* Header Section */}
      <section className="w-full mt-5 text-center bg-gradient-to-r from-green-600 to-black text-white py-12 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Advanced Courses (6-Month Programs)</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Master your craft with our 6-Month Advanced Courses! Designed for intermediate learners aiming to become professionals, these programs provide comprehensive training, real-world projects, and extensive mentorship to prepare you for a successful career in the digital economy.
        </p>
      </section>

      {/* Course List Section */}
      <section className="w-full mt-10">
        {advancedCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedCourses.map((course, index) => (
              <CourseList
                key={index}
                image={course.image}
                content={course.overView ?? ""}
                title={course.title.split("-").join(" ")}
                link={`/courses/${course.title}`}
                programType={course.programType}
                duration={course.duration}
                virtualPrice={course.virtualPrice}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No Advanced Courses available yet. Stay tuned for exciting updates!
          </p>
        )}

        {advancedCourses.length > coursesPerPage && (
          <Pagination
            page={page}
            totalPages={totalPages}
            baseUrl="/courses/advanced-courses"
          />
        )}
      </section>
    </main>
  );
}