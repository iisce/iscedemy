import FormError from '@/components/form-error';
import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';
import { getCourseBySlug } from '@/data/course';
import { generateCourseMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';


/**
 * This function is used to dynamically generate metadata for each course page
 */
export async function generateMetadata({
	params,
}: {
	params: { courseId: string };
}) {
	const courseDetails = await getCourseBySlug(params.courseId);

	if (!courseDetails) {
		notFound();
	}

	return generateCourseMetadata(
		courseDetails.title || "PalmTechnIQ Course",
		courseDetails.description || courseDetails.overView || "Learn cutting-edge tech skills with PalmTechnIQ",
		courseDetails.image || '/innovation.jpg',
		params.courseId,
	);
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
