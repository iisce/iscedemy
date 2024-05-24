import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';

export default function CoursePage({ params }: { params: { course: string } }) {
	return <SingleCourse courseTitle={params.course} />;
}
