'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SingleCourseCurriculum from './singleCourseCurriculum';
import { COURSE_OUTLINE, TUTOR_PROFILE, TUTOR_REVIEWS } from '@/lib/consts';
import * as Icons from '@/lib/icons';
import Image from "next/image";
import { Badge } from '@/components/ui/badge';
import TutorProfile from '@/components/component/tutor-profile';
import { SingleTutorReviews } from '@/components/component/tutor-reviews';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import CourseRegisterPage from '@/components/component/course-register';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import Link from 'next/link';
import FormError from '@/components/form-error';
import { Review } from '@prisma/client';

export default function SingleCourse({ courseTitle, tutorName }: { courseTitle: string; tutorName?: string}) {
	const courseDetails = COURSE_OUTLINE.find(
		(course) => course.title === courseTitle
	);
	const [activeTab, setActiveTab] = useState('overview');
	const [open, setOpen] = useState(false)

		/**This is the Calculation for the total reviews for a particular tutor */
		const [totalReviewsCount, setTotalReviewsCount] = useState(0);
		const [tutorReviews, setTutorReviews] = useState<Review[]>([]);
	
	  
		useEffect(() => {
		  const fetchReviewsCount = async () => {
			try {
			  const response = await fetch(`/api/reviews?tutorName=${tutor?.name || ''}`);
			  if (response.ok) {
				const data = await response.json();
				setTotalReviewsCount(data.length);
			  } else {
				console.error('Error fecthing review count');
			  }
			}catch (error) {
			  console.error('There was an error getting reviews', error);
			}
		  };
	  
		  fetchReviewsCount()
		}, [tutorName])

	if (!courseDetails) {
		return <div className='items-center md:w-1/2 w-full my-12 justify-center mx-auto'> 
			<p><FormError message='Course not available at the moment! Please check back later'/></p>
			</div>;
	}

	/**This picks the image in the tutor profile and sets it as the same image in the course header for a particular course */
	const tutor = TUTOR_PROFILE.find(profile => profile.name === courseDetails.tutorName);



	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const highestAverageRating = Math.round(
		tutorReviews.reduce((sum, review) =>
		 sum + review.rating, 0)/(totalReviewsCount || 1)
	  )
	 

	return (
		<div className='bg-white p-8 justify-center w-full'>
			<MaxWidthWrapper>
			<div className='flex flex-col justify-center items-center mx-auto md:flex-row md:space-x-8'>
				<div className='flex-1 space-y-6'>
					<div className='space-y-2 md:px-0 px-4 md:w-full w-96 '>
						<h1 className='md:text-4xl text-2xl text-wrap font-bold'>
							{courseDetails.textSnippet?.replace('{courseDetails.title}', courseDetails.title) || `Starting ${courseDetails.title} as your Home
							Based Business`}
							
						</h1>
						<div className='flex items-center space-x-2'>
							
								<Image
									width={50}
									height={50}
									alt={ tutor?.name ||'PalmtechnIQ'}
									src={ tutor?.image ||'/placeholder.svg'}
									className="object-cover rounded-full"
								/>
								
							
							<div className='flex flex-col my-2 space-y-1'>
								<div className='text-sm font-bold'>
									{courseDetails.tutorName}
								</div>
								<div className='flex flex-row items-center'>
								<div className="flex items-center">
										 {/* Display the highestAverageRating */}
									{[...Array(highestAverageRating)].map((_, index) => ( 
									<Icons.StarIcon key={index} className="text-yellow-500 h-4 w-4" /> 
									))}
										{/* Display empty stars */}
									{[...Array(5 - highestAverageRating)].map((_, index) => (
									<Icons.StarIcon key={index + highestAverageRating} className="text-green-600 h-4 w-4" /> 
									))}
								</div>

									<span className='ml-2 text-sm'>
										({totalReviewsCount}Review{totalReviewsCount !== 1 && 's'})
									</span>
								</div>
							</div>
						</div>
						<div className='flex space-x-2 text-sm'>
							<div className='text-green-600'>
								<Icons.BookOpenIcon />
							</div>
							{courseDetails.badgeType && (<Badge variant={'secondary'}>{courseDetails.badgeType}</Badge>)}
						</div>
					</div>
					<Tabs className='md:w-full min-w-32 md:px-0   justify-center items-center mx-auto' defaultValue='overview'>
						<div className='flex md:space-x-4 border-b'>
							<Button
								variant='ghost'
								onClick={() =>
									handleTabClick('overview')
								}
								className={
									activeTab === 'overview'
										? 'border-b-2 border-green-600'
										: 'text-black font-semibold'
								}
							>
								Overview
							</Button>
							<Button
								variant='ghost'
								onClick={() =>
									handleTabClick('curriculum')
								}
								className={
									activeTab === 'curriculum'
										? 'border-b-2 border-green-600'
										: 'text-black font-semibold'
								}
							>
								Curriculum
							</Button>
							<Button
								variant='ghost'
								onClick={() =>
									handleTabClick('instructor')
								}
								className={
									activeTab === 'instructor'
										? 'border-b-2 border-green-600'
										: 'text-black font-semibold'
								}
							>
								Instructor
							</Button>
							<Button
								variant='ghost'
								onClick={() =>
									handleTabClick('reviews')
								}
								className={
									activeTab === 'reviews'
										? 'border-b-2 border-green-600'
										: 'text-black font-semibold'
								}
							>
								Reviews
							</Button>
						</div>
						<TabsList className='grid grid-cols-4 gap-2 '>
						<TabsTrigger value='overview'>Overview</TabsTrigger>
						<TabsTrigger value='curriculum'>Curriculum</TabsTrigger>
						<TabsTrigger value='instructor'>Instructor</TabsTrigger>
						<TabsTrigger value='reviews'>Reviews</TabsTrigger>
						</TabsList>
						<TabsContent value='overview'>
						<div className="text-wrap">
								<h2 className='md:text-2xl text-xl font-bold'>
									Course Description
								</h2>
								<p className='mt-4 text-gray-700'>
									{courseDetails.description}
								</p>
								<h3 className='mt-6 md::text-xl text-lg font-semibold'>
									What You&apos;ll Learn?
								</h3>
								<ul className='list-disc pl-6 mt-4 space-y-2 text-gray-600'>
									{courseDetails.summary.map(
										(summaryList, i) => (
											<li key={i}>
												{summaryList}
											</li>
										)
									)}
								</ul>
								<p className='mt-4 text-gray-700'>
									{courseDetails.conclusion}
								</p>
							</div>
						</TabsContent>
						<TabsContent value='curriculum'>
						<SingleCourseCurriculum curriculum={courseDetails.curriculum}/>
						</TabsContent>
						<TabsContent value='instructor'>
						<TutorProfile  tutorName={courseDetails.tutorName} totalReviewsCount={totalReviewsCount} highestAverageRating={highestAverageRating}/>
						</TabsContent>
						<TabsContent value='reviews'>
						<SingleTutorReviews tutorName={courseDetails.tutorName} totalReviewsCount={totalReviewsCount} highestAverageRating={highestAverageRating}/>
						</TabsContent>
					</Tabs>
				</div>

				<div className='md:w-full w-screen space-y-6'>
					<iframe
						width='400'
						className='w-full h-96'
						height='315'
						src={courseDetails.tutorVideoUrl}
						title="Tutor's Explanatory Video"
					allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					></iframe>

					<div className='space-y-4 px-3 md:px-0 md:w-full w-screen flex flex-col justify-between items-center'>
						<h3 className='text-xl font-semibold'>
							Course Includes:
						</h3>
						<div className='space-y-4 '>
							<div className='flex flex-row justify-between  items-center'>

								<div className='text-green-600'>
									<Icons.NairaSignIcon/>
								</div>

								<span className='ml-2'>Price: Virtual/Physical</span>
								<span className='ml-auto font-bold'>
									{courseDetails.price}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600'>
									<Icons.UserIcon />
								</div>

								<span className='ml-2'>
								 	Instructor:
								</span>
								<span className=' ml-6 font-bold'>
									{courseDetails.tutorName}
								</span>
							</div>
							<hr />
							<div className='flex items-center'>
								<div className='text-green-600'>
									<Icons.ClockIcon />
								</div>

								<span className='ml-2'>Duration:</span>
								<span className='ml-auto font-bold'>
									{courseDetails.duration}
								</span>
							</div>
							<hr />
							<div className='flex items-center'>
								<div className='text-green-600'>
									<Icons.BookOpenIcon />
								</div>

								<span className='ml-2'>Classes:</span>
								<span className='ml-auto font-bold'>
									{courseDetails.classes}
								</span>
							</div>
							<hr />
							<div className='flex items-center'>
								<div className='text-green-600'>
									<Icons.UsersIcon />
								</div>

								<span className='ml-2'>Students:</span>
								<span className='ml-auto font-bold'>
									{
										courseDetails.numberOfStudentsErolled
									}
								</span>
							</div>
							<hr />
							<div className='flex items-center'>
								<div className='text-green-600 '>
									<Icons.GlobeIcon />
								</div>

								<span className='ml-2'>Language:</span>
								<span className='ml-auto font-bold'>
									{courseDetails.language}
								</span>
							</div>
							<hr />
							<div className='flex items-center'>
								<div className='text-green-600'>
									<Icons.BadgeCheckIcon />
								</div>

								<span className='ml-2'>
									Certifications:
								</span>
								<span className='ml-auto font-bold'>
									{courseDetails.certification}
								</span>
							</div>
						</div>
						<hr />
						<Drawer open={open} onOpenChange={setOpen}>
							<DrawerTrigger className='grid w-full bg-black text-background font-medium text-xl px-5 py-3 rounded-full'>
							Register Now
							</DrawerTrigger>
							<DrawerContent>
								<CourseRegisterPage/>
							</DrawerContent>
						</Drawer>
						
					</div>
					<div className=' md:px-0 px-4'>
						<h3 className='text-xl font-semibold'>
							Share On:
						</h3>
						<div className='flex flex-row  mt-4'>
							<div className='flex space-x-2 mt-4 text-white'>
								<Link href='https://www.facebook.com/'>
								<Button className='p-2 rounded-full bg-blue-500 hover:bg-green-600 text-white'>
									<Icons.FacebookIcon />
								</Button>
								</Link>
								<Link href='https://www.twitter.com'>
								<Button className='p-2 rounded-full bg-blue-300 hover:bg-green-600 text-white'>
									<Icons.TwitterIcon />
								</Button>
								</Link>
								<Link href='https://www.linkedin.com/'>
								<Button className='p-2 rounded-full bg-blue-700 hover:bg-green-600 text-white'>
									<Icons.LinkedinIcon />
								</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			</MaxWidthWrapper>
		</div>
	);
}
