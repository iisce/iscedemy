import CourseCarousel from "@/components/pages/courses/course-carousel";
import CourseList from "@/components/pages/courses/courselist";
import { getAllCourses } from "@/data/course";

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
