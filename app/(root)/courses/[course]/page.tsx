import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';

export default function CoursePage({ params }: { params: { course: string }; }) {
	return (
		<div className='lg:w-[83%]'>
			<MaxWidthWrapper> 

				 <SingleCourse courseTitle={params.course}/>
				 
			</MaxWidthWrapper>
		</div>
	);
}


