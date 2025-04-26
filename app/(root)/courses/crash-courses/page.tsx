import CourseCarousel from '@/components/pages/courses/course-carousel';
import CourseFilter from '@/components/pages/courses/course-filter';
import CourseList from '@/components/pages/courses/courselist';
import Pagination from '@/components/shared/pagination';
import { getAllCourses } from '@/data/course';
import { Metadata } from 'next'
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
	title:{
		absolute:  'Crash Courses - PalmTechnIQ',
	},
	description: 'Explore our Crash Courses at PalmTechnIQ. Learn essential digital skills in just a few hours with hands-on training, certificates, and mentorship.',
	metadataBase: new URL('https://www.palmtechniq.com/courses/crash-courses'),
	alternates:{
	  canonical: '/courses/crash-courses',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: {
		absolute: 'Crash Courses - PalmTechnIQ',
	  },
	  description: 'Explore our Crash Courses at PalmTechnIQ. Learn essential digital skills in just a few hours with hands-on training, certificates, and mentorship.',
	  url: 'https://www.palmtechniq.com/courses/crash-courses',
	  siteName: 'PalmTechnIQ',
	  images: '/jopwe.jpg'
	}
}

interface CrashCoursesPageProps {
  searchParams: { page?: string };
}

export default async function CrashCoursePage({searchParams}: CrashCoursesPageProps) {
  const courses = await getAllCourses();
  const crashCourses = courses.filter(course => course.programType === "CRASH_COURSE");
  
  const page = parseInt(searchParams.page || "1", 6);
  const coursesPerPage = 6;
  const totalPages = Math.ceil(crashCourses.length / coursesPerPage);
  const startIndex = (page - 1) * coursesPerPage;
  const paginatedCourses = crashCourses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <main className="flex flex-col items-center justify-center lg:w-[83%] mx-auto pb-3">
      <nav className="w-full mt-4 font-bold text-sm text-green-600 py-3">
        <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
        <Link href="/courses" className="hover:underline">Courses</Link> &gt; Crash Courses
      </nav>
       <section className="w-full text-center mt-5 bg-gradient-to-r from-green-600 to-black text-white py-12 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Crash Courses</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Kickstart your learning journey with our intensive Crash Courses! Master essential digital skills in just a few hours through hands-on training, real-time projects, and expert mentorship. Perfect for beginners looking to dive into technology, business, or design.
        </p>
      </section>
      <div className="mt-10 w-full">
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
            No Crash Courses available yet. Stay tuned for exciting updates!
          </p>
        )}

    {crashCourses.length > coursesPerPage && (
         <Pagination
         page={page}
         totalPages={totalPages}
         baseUrl='/courses/crash-courses'
         />
        )}
        </div>
    </main>
  )
}
