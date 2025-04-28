import { auth } from '@/auth';
import PurchaseCourseForm from '@/components/component/forms/purchase-course-form';
import { Button } from '@/components/ui/button';
import { getCourseBySlug } from '@/data/course';
import { getUserById } from '@/data/user';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

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


export default async function EnrollPage({
	params,
}: {
	params: { course: string };
}) {
	const course = await getCourseBySlug(params.course);
	if (!course) return notFound();
	const session = await auth();
	const dbUser = await getUserById(session?.user?.id ?? '');
	if (!dbUser) {
		return redirect('/login');
	}
	const isPaid = dbUser?.courses?.includes(course.id);

	if (isPaid) {
		return (
			<div className='flex flex-col items-center min-h-[calc(100svh-120px)] justify-center p-3'>
				<div className='max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
					<div className='md:flex'>
						<div className='md:w-1/2 p-4 bg-gray-100'>
							<div>
								Hi{' '}
								<span className='font-bold'>
									{dbUser.name}
								</span>
								!
							</div>
							<div>You Already Purchased this course:</div>
							<h1 className='capitalize text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
								{course.title.split('-').join(' ')}
							</h1>
							<p className='text-gray-600 dark:text-gray-400 mb-8'>
								{course.conclusion}
							</p>
							<Button
								asChild
								className='w-full'>
								<Link href='/student'>
									<span className='text-white'>
										Go to your dashboard
									</span>
								</Link>
							</Button>
						</div>
						<div className='md:w-1/2'>
							<Image
								src={course.image}
								alt='Register Course || PalmTechnIQ'
								className='w-full h-full object-cover'
								height={600}
								width={600}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className='flex flex-col items-center min-h-[calc(100svh-120px)] justify-center p-3'>
			<div className='max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
				<div className='md:flex'>
					<div className='md:w-1/2 p-4 bg-gray-100'>
						<div>
							Hi{' '}
							<span className='font-bold'>
								{dbUser.name}
							</span>
							!
						</div>
						<div>You are about to purchase:</div>
						<PurchaseCourseForm
							student={dbUser}
							course={course}
						/>
					</div>
					<div className='md:w-1/2'>
						<Image
							src={course.image}
							alt='Register Course || PalmTechnIQ'
							className='w-full h-full object-cover'
							height={600}
							width={600}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
