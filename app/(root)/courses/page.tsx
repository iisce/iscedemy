import CourseCarousel from "@/components/pages/courses/course-carousel";
import CourseList from "@/components/pages/courses/courselist";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/data/course";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title:{
		absolute:  'Courses - PalmtechnIQ',
	},
	description: 'Explore a wide range of courses at PalmTechnIQ, from Crash Courses to Advanced Programs, designed to empower you with digital skills.',
	metadataBase: new URL('https://www.palmtechniq.com/courses'),
	alternates:{
	  canonical: '/courses',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: {
		absolute: 'Courses - PalmtechnIQ',
	  },
	  description: 'Explore a wide range of courses at PalmTechnIQ, from Crash Courses to Advanced Programs, designed to empower you with digital skills.',
	  url: 'https://www.palmtechniq.com/courses',
	  siteName: 'PalmTechnIQ',
	  images: '/jopwe.jpg'
	}
}

interface CoursesPageProps {
	searchParams: { page?: string };
  }

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
     const courses = await getAllCourses();


	 const page = parseInt(searchParams.page || "1", 6);
	const coursesPerPage = 6;
	const totalPages = Math.ceil(courses.length / coursesPerPage);
	const startIndex = (page - 1) * coursesPerPage;
	const paginatedCourses = courses.slice(startIndex, startIndex + coursesPerPage);


	 const crashCourses = courses.filter(course => course.programType === "CRASH_COURSE");
	 const threeMonthCourses = courses.filter(course => course.programType === "THREE_MONTHS");
	 const sixMonthCourses = courses.filter(course => course.programType === "SIX_MONTHS");
     return (
          <main className="flex flex-col items-center justify-center lg:w-[83%]  pb-3">
			<nav className="w-full mt-4  font-bold text-sm text-green-600 py-3">
				<Link href="/" className="hover:underline">Home</Link> &gt; Courses
			</nav>
               <div className="mt-5 w-full">
                    <CourseCarousel crashCourses={crashCourses.slice(0, 3)}
					threeMonthCourses={threeMonthCourses.slice(0, 3)}
					sixMonthCourses={sixMonthCourses.slice(0, 3)} />

               </div>
			   <section className="w-full mt-10">
        <div className="flex space-x-4 mb-6">
          <Link href="/courses">
            <Button className="px-4 py-2 rounded-full bg-primary hover:bg-gray-300">
              All Courses
            </Button>
          </Link>
          <Link href="/courses/crash-courses">
            <Button className="px-4 py-2 rounded-full bg-primary hover:bg-gray-300">
              Crash Courses
            </Button>
          </Link>
          <Link href="/courses/intermediate-courses">
            <Button className="px-4 py-2 rounded-full bg-primary hover:bg-gray-300">
              3-Month Programs
            </Button>
          </Link>
          <Link href="/courses/advanced-courses">
            <Button className="px-4 py-2 rounded-full bg-primary hover:bg-gray-300">
              6-Month Programs
            </Button>
          </Link>
        </div>

        {/* Course List Section */}
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

		{courses.length > coursesPerPage && (
              <Pagination
                page={page}
                totalPages={totalPages}
                baseUrl="/courses"
              />
            )}
      </section>
          </main>
     );
}
