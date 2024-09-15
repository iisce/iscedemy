'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import FormError from '../../form-error';
import { ITutorProfileProps } from '../../../lib/types';
import { TUTOR_PROFILE } from '../../../lib/consts';
import React from 'react';

export default function TutorProfile({ tutorName }: ITutorProfileProps) {
	const tutor = TUTOR_PROFILE.find((profile) => profile.name === tutorName);
	const [totalReviewsCount, setTotalReviewsCount] = useState(0);

	useEffect(() => {
		const fetchReviewsCount = async () => {
			try {
				const response = await fetch(
					`/api/reviews?tutorName=${tutorName}`
				);
				if (response.ok) {
					const data = await response.json();
					setTotalReviewsCount(data.length);
				} else {
					console.error('Error fecthing review count');
				}
			} catch (error) {
				console.error('There was an error getting reviews', error);
			}
		};

		fetchReviewsCount();
	}, [tutorName]);

	if (!tutor) {
		return (
			<div>
				<FormError message='Tutor profile not available at the moment' />
			</div>
		);
	}
	return (
		<div className='w-full px-4 md:px-0 py-4 mx-auto justify-center items-center md:p-6 bg-white '>
			<div className='flex md:flex-row flex-col md:gap-0 gap-2 justify-center items-center'>
				<div className='md:-translate-y-20  md:block w-full h-full'>
					<Image
						width={50}
						height={50}
						src={tutor.image}
						alt={`PalmTechnIQ | ${tutor.name}`}
						className='object-cover rounded-full'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<h1 className='md:text-2xl text-xl font-semibold'>
						{tutor.name}
					</h1>
					{/* <p className="text-sm text-gray-700">{totalReviewsCount} Review{totalReviewsCount !== 1 && 's'}</p> */}
					<p className='text-sm text-gray-700'>{tutor.role}</p>
					<p className='mt-4 text-gray-700'>{tutor.about}</p>
				</div>
			</div>
		</div>
	);
}
