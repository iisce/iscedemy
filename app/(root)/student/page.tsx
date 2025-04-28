import { auth } from "@/auth";
import { CoursePaid } from "@/components/component/student/course-paid";
import { CourseCard } from "@/components/component/student/student-card";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { getAllCourses, getCourseById } from "@/data/course";
import { getAllCurriculumByCourseId } from "@/data/curriculum";
import { getUserById } from "@/data/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
	title: 'Student Dashboard',
	description: 'Stay in-charge of your courses and monitor your learning process!',
	metadataBase: new URL('https://www.palmtechniq.com/student'),
	alternates:{
	  canonical: '/student',
	  languages: {
		'en-US':'/en-US',
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

	 if(session?.user?.role !== 'STUDENT') {
		redirect('/unauthorized');
	
		return null;
	  }

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
                              {await paidCourses.map(async (id, b) => {
                                   const currentCourse =
                                        await getCourseById(id);
                                   const curriculum =
                                        await getAllCurriculumByCourseId(id);
                                   return (
                                        <CoursePaid
                                             title={currentCourse!.title}
											 curriculum={Array.isArray(curriculum) ? curriculum : curriculum ? [curriculum] : undefined}
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
                                   badgeText="HOT"
                                   isBought={paidCourses?.includes(course.id)}
                              />
                         ))}
                    </div>
               </section>
               
          </MaxWidthWrapper>
     );
}


