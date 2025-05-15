import CourseList from "@/components/pages/courses/courselist";
import Pagination from "@/components/shared/pagination";
import { getAllCourses } from "@/data/course";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:{
    absolute:  'Intermediate Courses (3-Month Programs) - PalmTechnIQ',
},
description: 'Advance your skills with our 3-Month Intermediate Courses at PalmTechnIQ. Build on your foundational knowledge with in-depth training, projects, and mentorship.',
metadataBase: new URL('https://www.palmtechniq.com/courses/intermediate-courses'),
alternates:{
  canonical: '/courses/intermediate-courses',
  languages: {
    'en-US':'/en-US',
    'de-DE': '/de-DE',
  },
},
openGraph: {
  title: {
    absolute: 'Intermediate Courses (3-Month Programs) - PalmTechnIQ',
  },
  description: 'Advance your skills with our 3-Month Intermediate Courses at PalmTechnIQ. Build on your foundational knowledge with in-depth training, projects, and mentorship.',
  url: 'https://www.palmtechniq.com/courses/intermediate-courses',
  siteName: 'PalmTechnIQ',
  images: '/jopwe.jpg'
}
};

interface IntermediateCoursesPageProps{
    searchParams: {page?: string};
}

export default async function IntermediateCoursesPage({searchParams}: IntermediateCoursesPageProps) {
  const courses = await getAllCourses();
  const intermediateCourses = courses.filter(course => course.programType === "THREE_MONTHS");

  const page = parseInt(searchParams.page || "1", 6)
  const coursePerPage = 6;
  const totalPages = Math.ceil(intermediateCourses.length / coursePerPage);
  const startIndex = (page - 1) * coursePerPage;
  const paginatedCourses = intermediateCourses.slice(startIndex, startIndex + coursePerPage);
  
  return (
    <main className="flex flex-col items-center justify-center lg:w-[83%] mx-auto pb-3">
        <nav className="w-full mt-4 font-bold text-sm text-green-600 py-3">
        <Link href="/" className="hover:underline">Home</Link> &gt; {" "}
        <Link href="/courses" className="hover:underline">Courses</Link> &gt; Intermediate Courses
      </nav>
      {/* Header Section */}
      <section className="w-full mt-5 text-center bg-gradient-to-r from-green-600 to-black text-white py-12 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-4xl font-bold">Intermediate Courses (3-Month Programs)</h1>
        <p className="mt-4 text-sm px-3 md:text-lg max-w-2xl mx-auto">
          Take your skills to the next level with our 3-Month Intermediate Courses! Designed for learners with foundational knowledge, these programs offer in-depth training, real-world projects, and personalized mentorship to help you grow confidently in the digital economy.
        </p>
      </section>

      {/* Course List Section */}
      <section className="w-full mt-10">
        {paginatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCourses.map((course, index) => (
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
            No Intermediate Courses available yet. Stay tuned for exciting updates!
          </p>
        )}
        {intermediateCourses.length > coursePerPage && (
            <Pagination
            page={page}
            totalPages={totalPages}
            baseUrl="/courses/intermediate-courses"
            />
        )}
      </section>
    </main>
  );
}