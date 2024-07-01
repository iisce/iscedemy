import AdminCourseList from "@/components/pages/courses/admin-course-list";
import { getAllCourses } from "@/data/course";

export default async function Component() {
     const courses = await getAllCourses();
     return <AdminCourseList courses={courses} />;
}
