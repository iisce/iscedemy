import { auth } from "@/auth";
import AdminCourseList from "@/components/pages/courses/admin-course-list";
import { getAllCourses, getCourseBySlug } from "@/data/course";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";


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
	const session = await auth();
     const courses = await getAllCourses();

	 if(session?.user?.name !== 'ADMIN') {
		redirect('/unauthorized');
	
		return null;
	  }
     return <AdminCourseList courses={courses} />;
}
