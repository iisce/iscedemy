import { auth } from '@/auth';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';
import { redirect } from 'next/navigation';

export default async function CoursePage({ params }: { params: { course: string }; }) {
	// const session = await auth()
	// if (!session?.user) return redirect('/login')
	// const user =  session.user
	return (
		<div className='md:w-[83%] w-full mx-auto justify-center items-center'>
			<MaxWidthWrapper> 
				 <SingleCourse  courseTitle={params.course}/>
			</MaxWidthWrapper>
		</div>
	);
}


