import CourseRegisterPage from '@/components/component/course-register';
import TutorProfile from '@/components/component/tutor-profile';
import FormError from '@/components/form-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { COURSE_OUTLINE, TUTOR_PROFILE } from '@/lib/consts';
import * as Icons from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import CourseRating from './courseRating';
import SingleCourseCurriculum from './singleCourseCurriculum';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getAllReviewsByTutorName } from '@/data/reviews';
import { SingleTutorReviews } from '@/components/component/tutor-reviews';
import { auth } from '@/auth';
import SignOutButton from '@/components/ui/sign-out';

export default async function SingleCourse({
	courseTitle,
}: {
	courseTitle: string;
}) {

	const session = await auth();
	const user = session?.user

	const courseDetails = COURSE_OUTLINE.find(
		(course) => course.title === courseTitle
	);

	if (!courseDetails) {
		return (
			<div className='items-center md:w-1/2 w-full my-12 justify-center mx-auto'>
				<p>
					<FormError message='Course not available at the moment! Please check back later' />
				</p>
			</div>
		);
	}

	/**This picks the image in the tutor profile and sets it as the same image in the course header for a particular course */
	const tutor = TUTOR_PROFILE.find(
		(profile) => profile.name === courseDetails.tutorName
	);

	const reviews = await getAllReviewsByTutorName(tutor?.name);
	return (
		<div className='bg-white justify-center w-full py-5'>
			<div className='grid lg:grid-cols-5 gap-5'>
				<div className='lg:col-span-3 flex flex-col w-full gap-5'>
					<div className='space-y-2 md:px-0 px-4 w-full '>
						<h1 className='md:text-4xl text-2xl text-wrap font-bold capitalize'>
							{courseDetails.textSnippet?.replace(
								'{courseDetails.title}',
								decodeURI(courseDetails.title).split('-').join(' ')
							) ||
								`Starting ${courseDetails.title} as your Home
							Based Business`}
						</h1>
						<div className='flex items-center space-x-2'>
							<Image
								width={50}
								height={50}
								alt={tutor?.name || 'PalmtechnIQ'}
								src={tutor?.image || '/placeholder.svg'}
								className='object-cover rounded-full'
							/>

							<div className='flex flex-col my-2 space-y-1'>
								<div className='text-sm font-bold'>
									{courseDetails.tutorName}
								</div>
								<CourseRating tutor={tutor} />
							</div>
						</div>
						<div className='flex space-x-2 text-sm'>
							<div className='text-green-600'>
								<Icons.BookOpenIcon />
							</div>
							{courseDetails.badgeType && (
								<Badge variant={'secondary'}>
									{courseDetails.badgeType}
								</Badge>
							)}
						</div>
					</div>
					<Tabs
						className='md:px-0 justify-center items-center mx-auto w-full'
						defaultValue='overview'
					>
						<ScrollArea className=''>
							<TabsList className='grid grid-cols-4 gap-2 '>
								<TabsTrigger value='overview'>
									Overview
								</TabsTrigger>
								<TabsTrigger value='curriculum' >
									Curriculum
								</TabsTrigger>
								<TabsTrigger value='instructor'>
									Instructor
								</TabsTrigger>
								<TabsTrigger value='reviews'>
									Reviews
								</TabsTrigger>
							</TabsList>
							<ScrollBar orientation='horizontal' />
						</ScrollArea>
						<TabsContent value='overview'>
							<div className='text-wrap'>
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
						<TabsContent value='curriculum' >
							{user ? <SingleCourseCurriculum
								curriculum={courseDetails.curriculum}
							/> : <> <div className='mx-auto items-center justify-center text-center'><p className='py-10 text-base'>{`Please sign in to see this page`}</p> <SignOutButton/></div></>} 
						</TabsContent>
						<TabsContent value='instructor'>
							<TutorProfile
								tutorName={courseDetails.tutorName}
								highestAverageRating={3}
							/>
						</TabsContent>
						<TabsContent value='reviews'>
							<SingleTutorReviews
								reviews={reviews ?? []}
								tutor={tutor}
							/>
						</TabsContent>
					</Tabs>
				</div>

				<div className='lg:col-span-2 flex flex-col gap-5'>
					<video
						width='400'
						height='315'
						controls
						className='w-full aspect-video'
					>
						<source
							src={courseDetails.tutorVideoUrl}
							type='video/mp4'
						/>
					</video>

					<div className='space-y-4 px-3 grid place-items-start'>
						<h3 className='text-xl font-semibold'>
							Course Includes:
						</h3>
						<div className='space-y-4 w-full '>
							<div className='flex flex-row justify-between items-center'>
								<span className='text-green-600 flex items-center'>
									<Icons.NairaSignIcon />
									Price:
								</span>
								<div className='font-bold'>
									<div className=''>
										Virtual/Physical
									</div>
									<div className=''>
										{courseDetails.price}
									</div>
								</div>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center'>
									<Icons.UserIcon />
									<span className=''>
										Instructor:
									</span>
								</div>

								<span className='font-bold'>
									{courseDetails.tutorName}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center'>
									<Icons.ClockIcon />
									<span className=''>Duration:</span>
								</div>

								<span className='font-bold'>
									{courseDetails.duration}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center'>
									<Icons.BookOpenIcon />
									<span className=''>Classes:</span>
								</div>

								<span className='font-bold'>
									{courseDetails.classes}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center'>
									<Icons.UsersIcon />
									<span className=''>Students:</span>
								</div>

								<span className='font-bold'>
									{
										courseDetails.numberOfStudentsErolled
									}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center'>
									<Icons.GlobeIcon />
									<span className=''>Language:</span>
								</div>

								<span className='ml-0 font-bold'>
									{courseDetails.language}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center'>
									<Icons.BadgeCheckIcon />
									<span className=''>
										Certifications:
									</span>
								</div>

								<span className='font-bold'>
									{courseDetails.certification}
								</span>
							</div>
						</div>
						<hr />
						<Drawer>
							<DrawerTrigger className='grid w-full bg-black text-background font-medium text-xl px-5 py-3 rounded-full'>
								Register Now
							</DrawerTrigger>
							<DrawerContent>
								<CourseRegisterPage />
								<DrawerClose
									asChild
									className='mx-auto max-w-2xl mb-10'
								>
									<Button
										className='w-full rounded-full'
										variant='outline'
									>{`Cancel`}</Button>
								</DrawerClose>
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
		</div>
	);
}
