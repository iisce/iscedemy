import FormError from '@/components/form-error';
import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';
import { getCourseBySlug } from '@/data/course';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
			url: `https://www.palmtechniq.com/courses/${params.course}`,
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

export default async function CoursePage({
	params,
	searchParams,
}: {
	params: { course: string };
	searchParams?: {
		tab?: string;
	};
}) {
	const tab = searchParams?.tab || 'overview';
	const courseDetails = await getCourseBySlug(params.course);
	if (!courseDetails) {
		return <FormError message='Course not found!' />;
	}

	return (
		<SingleCourse
			courseTitle={params.course}
			tab={tab}
		/>
	);
}
