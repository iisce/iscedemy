import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';

export default function CoursePage({ params }: { params: { course: string }; }) {
	return (
		<div className='md:w-[83%] w-full mx-auto justify-center items-center'>
			<MaxWidthWrapper> 

				 <SingleCourse courseTitle={params.course}/>
				 
			</MaxWidthWrapper>
		</div>
	);
}


