import CourseCarousel from "@/components/pages/courses/course-carousel";
import CourseList from "@/components/pages/courses/courselist";
import { getAllCourses } from "@/data/course";
import { Metadata } from "next";


export const metadata: Metadata = {
	title:{
		absolute:  'Explore Courses',
	},
	description: 'We believe in child education! The way to change the world is by enabling them to paint a world of their own.',
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
		absolute: 'Explore Courses',
	  },
	  description: 'We believe in child education! The way to change the world is by enabling them to paint a world of their own.',
	  url: 'https://www.palmtechniq.com/courses',
	  siteName: 'PalmTechnIQ',
	  images: '/jopwe.jpg'
	}
}

export default async function CoursesPage() {
     const courses = await getAllCourses();
     return (
          <main className="flex flex-col items-center justify-center lg:w-[83%]">
               <div className="mt-5 w-full">
                    <CourseCarousel />
                    <div className="mb-6 mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                         {courses.map((value, k) => (
                              <CourseList
                                   key={k}
                                   // icon={value.icon}
                                   image={value.image}
                                   content={value.overView ?? ""}
                                   title={value.title.split("-").join(" ")}
                                   link={`/courses/${value.title}`}
                              />
                         ))}
                    </div>
               </div>
          </main>
     );
}
