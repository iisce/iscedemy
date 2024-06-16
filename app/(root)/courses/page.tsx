import CourseCarousel from '@/components/pages/courses/course-carousel';
import CourseList from '@/components/pages/courses/courselist';
import { getAllCourses, getCourseBySlug } from '@/data/course';

export default async function CoursesPage() {
	const courses = await getAllCourses();
	return (
		<main className='lg:w-[83%] flex flex-col justify-center items-center'>
			<div className='w-full  mt-5'>
				<CourseCarousel />
				<div className='grid gap-3 mt-6 mb-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
					{courses.map((value, k) => (
						<CourseList
							key={k}
							// icon={value.icon}
							image={value.image}
							content={value.overView ?? ''}
							title={value.title.split('-').join(' ')}
							link={`/courses/${value.title}`}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
