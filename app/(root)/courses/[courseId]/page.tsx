import FormError from '@/components/form-error';
import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';
import { getCourseBySlug } from '@/data/course';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';


/**
 * This function is used to dynamically generate metadata for each blog post
 */
export async function generateMetadata({
	params,
}: {
	params: { courseId: string };
}): Promise<Metadata> {
	const courseDetails = await getCourseBySlug(params.courseId);

	if (!courseDetails) {
		notFound();
	}

	return {
		title: courseDetails.title.split('-').join(' ') || "PalmTechnIQ Course",
		description: courseDetails.description,
		openGraph: {
			title: courseDetails.title.split('-').join(' ') || "PalmTechnIQ Course",
			description: courseDetails.description,
			url: `https://www.palmtechniq.com/courses/${params.courseId}`,
			siteName: 'PalmTechnIQ',
			images: [
				{
					url: courseDetails.description || '/innovation.jpg',
					alt: courseDetails.title || "PalmTechnIQ",
				},
			],
		},
	};
}

export default async function CoursePage({
	params,
	searchParams,
}: {
	params: { courseId: string };
	searchParams?: {
		tab?: string;
	};
}) {
	const tab = searchParams?.tab || 'overview';
	const courseDetails = await getCourseBySlug(params.courseId);
	if (!courseDetails) {
		return (
		  <div className="w-full px-4 md:px-6">
			<FormError message="Course not found!" />
		  </div>
		);
	  }
	return (
		<div className="w-full">
		<SingleCourse
			courseTitle={params.courseId}
			tab={tab}
		/>
		</div>
	);
}
