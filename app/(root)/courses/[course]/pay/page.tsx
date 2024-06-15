import { logout } from '@/actions/main';
import { auth } from '@/auth';
import PurchaseCourseForm from '@/components/component/purchase-course-form';
import { getCourseBySlug } from '@/data/course';
import { getUserById } from '@/data/user';
import { formatToNaira } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

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
							alt='Video Editing Course'
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
