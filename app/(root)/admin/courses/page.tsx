import AdminCourseList from "@/components/pages/courses/admin-course-list";
import { getAllCourses, getCourseBySlug } from "@/data/course";
import { Metadata } from "next";
import { notFound } from "next/navigation";


export async function generateMetadata({
	params,
}: {
	params: { course: string };
}): Promise<Metadata> {
	const courseDetails = await getCourseBySlug(params.course);

	if (!courseDetails) {
		notFound();
	}

	return {
		title: courseDetails.title.split('-').join(' '),
		description: courseDetails.description,
		openGraph: {
			title: courseDetails.title.split('-').join(' '),
			description: courseDetails.description,
			url: `https://www.palmtechniq.com/admin/courses/${params.course}`,
			siteName: 'PalmTechnIQ',
			images: [
				{
					url: courseDetails.description || '/innovation.jpg',
					width: 800,
					height: 600,
					alt: courseDetails.title || "PalmTechnIQ",
				},
			],
		},
	};
}

export default async function Component() {
     const courses = await getAllCourses();
     return <AdminCourseList courses={courses} />;
}
