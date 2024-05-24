'use client';

import { Review } from '@prisma/client';
import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function CourseRating({ tutor }: { tutor: any }) {
	const [tutorReviews, setTutorReviews] = useState<Review[]>([]);
	const [totalReviewsCount, setTotalReviewsCount] = useState(0);

	useEffect(() => {
		const fetchReviewsCount = async () => {
			try {
				const response = await fetch(
					`/api/reviews?tutorName=${tutor?.name || ''}`
				);
				if (response.ok) {
					const data = await response.json();
					setTutorReviews(data);
					setTotalReviewsCount(data.length);
				} else {
					console.error('Error fetching reviews');
				}
			} catch (error) {
				console.error('There was an error getting reviews', error);
			}
		};

		fetchReviewsCount();
	}, [tutor?.name]);

	const highestAverageRating = Math.round(
		tutorReviews.reduce((sum, review) => sum + review.rating, 0) /
			(totalReviewsCount || 1)
	);

	return (
		<div className='flex flex-row items-center'>
			<div className='flex items-center'>
				{/* Display the highestAverageRating */}
				{[...Array(highestAverageRating)].map((_, index) => (
					<Star
						key={index}
						className='text-yellow-500 h-4 w-4'
					/>
				))}
				{/* Display empty stars */}
				{[...Array(5 - highestAverageRating)].map((_, index) => (
					<Star
						key={index + highestAverageRating}
						className='text-green-600 h-4 w-4'
					/>
				))}
			</div>

			<span className='ml-2 text-sm'>
				({totalReviewsCount} Review
				{totalReviewsCount >= 1 && 's'})
			</span>
		</div>
	);
}
