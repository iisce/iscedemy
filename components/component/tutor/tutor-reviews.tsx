'use client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import * as Icons from '@/lib/icons';
import { Review, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import EditReviewForm from '../forms/edit-review-form';
import ReviewForm from '../forms/review-form';
import { Separator } from '@/components/ui/separator';


export function SingleTutorReviews({
	reviews,
	tutor,
	courseId
}: {
	reviews: Review[];
	tutor: User;
	courseId: string;
}) {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	console.log({ reviews });

	const session = useSession();
	const reviewByMe = reviews.find(
		({ userId }) => userId === session.data?.user?.id
	);
	/**This const will be used to calculate the reviews based on the total and displays it on the progress bar
	 * Basically; it handles the movement of the progress bar based on number of stars
	 * on a particular tutors profile
	 */
	const starCounts = [0, 0, 0, 0, 0];
	reviews.forEach((review) => {
		starCounts[review.rating - 1]++;
	});
	const totalRatings = reviews.length;

	/** This const handles the average sum of stars on a tutor profile reviews
	 * rounded average star rating as the number of filled stars,
	 * giving a clearer representation of the tutor's overall performance.
	 */
	const highestAverageRating = Math.round(
		reviews.reduce((sum, review) => sum + review.rating, 0) /
			(reviews.length || 1)
	);

	return (
		<div className='w-full mx-auto p-5'>
			<div className='grid overflow-hidden gap-5 items-start'>
				<div className='bg-white w-40 justify-center min-w-24 grid p-4 rounded-lg shadow items-center'>
					<div className='text-3xl mx-auto text-center font-bold'>
						{reviews.length}
					</div>
					<div className='flex text-green-600'>
						{[...Array(highestAverageRating)].map(
							(_, index) => (
								<Icons.StarIcon key={index} />
							)
						)}
					</div>
					<span className='mx-auto text-center py-2 text-sm'>
						{reviews.length} Review
						{reviews.length >= 1 && 's'}
					</span>
				</div>
				<div className='grid gap-2'>
					{[5, 4, 3, 2, 1].map((numStars) => {
						const count = starCounts[numStars - 1];
						const percentage =
							totalRatings > 0
								? (count / totalRatings) * 100
								: 0;

						return (
							<div
								key={numStars}
								className='flex w-full items-center gap-3'>
								<div className='text-green-600 gap-3 flex flex-row'>
									{numStars} <Icons.StarIcon />
								</div>
								<Progress
									className='w-full mx-2'
									value={percentage}
								/>
								<div>{count}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='mt-12 space-y-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-semibold underline'>
						Reviews
					</h2>
					{isEditing && (
						<Button
							variant={'destructive'}
							onClick={() => setIsEditing(false)}>
							Cancel Editing
						</Button>
					)}
				</div>

				<div className='grid gap-5'>
					{reviewByMe && isEditing && (
						<EditReviewForm
							review={reviewByMe}
							setIsEditing={setIsEditing}
						/>
					)}

					{!reviewByMe && (
						<ReviewForm
							reviewerId={session.data?.user?.id ?? ''}
							reviewerName={session.data?.user?.name ?? ''}
							tutorName={tutor.name ?? 'Tutor'}
							courseId={courseId}
						/>
					)}
				</div>
				<div className='mt-4 '>
					{!isEditing &&
						reviews.map((review, i) => (
							<div
								className='flex flex-col items-center space-x-4'
								key={i}>
								<div className='flex flex-col w-full space-y-2 py-3'>
									<div className='text-lg font-semibold'>
										{review.reviewerName}
									</div>
									<div className='flex text-green-600'>
										{[
											...Array(review.rating),
										].map((_, index) => (
											<Icons.StarIcon
												key={index}
											/>
										))}
									</div>
									<div className='text-gray-900'>
										{review.title}
									</div>
									<p className='text-gray-700 mt-1'>
										{review.description}
									</p>
								</div>
								<div className='grid grid-cols-2 gap-2 w-full pb-3'>
									{reviewByMe &&
										review.userId ===
											session.data?.user
												?.id && (
											<>
												<Button
													className='grid'
													onClick={() =>
														setIsEditing(
															true
														)
													}>
													Edit
												</Button>
												<Button
													className='grid'
													onClick={() =>
														setIsEditing(
															false
														)
													}>
													Cancel
												</Button>
											</>
										)}
								</div>
								<Separator className='w-full' />
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
