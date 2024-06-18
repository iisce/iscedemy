import { auth } from '@/auth';
import TutorProfile from '@/components/component/tutor-profile';
import { SingleTutorReviews } from '@/components/component/tutor-reviews';
import FormError from '@/components/form-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import SignOutButton from '@/components/ui/sign-out';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCourseBySlug } from '@/data/course';
import { getAllCurriculumByCourseId } from '@/data/curriculum';
import { getAllReviewsByTutorName } from '@/data/reviews';
import { getUserByCourseId, getUserById } from '@/data/user';
import * as Icons from '@/lib/icons';
import { formatToNaira } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CourseRating from './courseRating';
import SingleCourseCurriculum from './singleCourseCurriculum';

export default async function SingleCourse({
	courseTitle,
	tab,
}: {
	courseTitle: string;
	tab?: string;
}) {
	const session = await auth();
	const user = session?.user;

	const currentUser = await getUserById(user?.id ?? '');

	const courseDetails = await getCourseBySlug(courseTitle);
	if (!courseDetails) return notFound();
	const tutor = await getUserById(courseDetails.tutorId);
	if (!tutor) return notFound();

	if (!courseDetails) {
		return (
			<div className='items-center md:w-1/2 w-full my-12 justify-center mx-auto'>
				<p>
					<FormError message='Course not available at the moment! Please check back later' />
				</p>
			</div>
		);
	}
	const curriculum = await getAllCurriculumByCourseId(courseDetails.id);

	const reviews = await getAllReviewsByTutorName(tutor.name!);

	const numberOfRegistration = await getUserByCourseId(courseDetails.id);

	const totalRating = reviews?.reduce(
		(total, review) => total + review.rating,
		0
	);
	const isPaid = currentUser?.courses?.includes(courseDetails.id);
	return (
		<div className='bg-white justify-center w-full py-5'>
			<div className='grid lg:grid-cols-5 gap-5'>
				<div className='lg:col-span-3 flex flex-col w-full gap-5'>
					<div className='space-y-2 md:px-0 px-4 w-full '>
						<h1 className='md:text-4xl text-2xl text-wrap font-bold capitalize'>
							{courseDetails.textSnippet?.replace(
								'{courseDetails.title}',
								decodeURI(courseDetails.title)
									.split('-')
									.join(' ')
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
									{tutor.name}
								</div>
								<CourseRating tutor={tutor} />
							</div>
						</div>
						<div className='flex space-x-2 text-sm'>
							<div className='text-green-600'>
								<Icons.BookOpenIcon />
							</div>
							{courseDetails.category && (
								<Badge variant={'secondary'}>
									{courseDetails.category}
								</Badge>
							)}
						</div>
					</div>
					<Tabs
						className='md:px-0 justify-center items-center mx-auto w-full'
						defaultValue={tab}>
						<ScrollArea className=''>
							<TabsList className='grid grid-cols-4 gap-2 '>
								<TabsTrigger value='overview'>
									Overview
								</TabsTrigger>
								<TabsTrigger value='curriculum'>
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
									{courseDetails.summary
										.split('---')
										.map((summaryList, i) => (
											<li key={i}>
												{summaryList}
											</li>
										))}
								</ul>
								<p className='mt-4 text-gray-700'>
									{courseDetails.conclusion}
								</p>
							</div>
						</TabsContent>
						<TabsContent value='curriculum'>
							{user && isPaid ? (
								<SingleCourseCurriculum
									curriculum={curriculum}
								/>
							) : !isPaid ? (
								<>
									<div className='mx-auto items-center justify-center text-center'>
										<p className='py-10 text-base'>{`Enroll for this course to get complete access!`}</p>
										<Button asChild>
											<Link
												href={`/courses/${courseDetails.title}/pay`}>
												Enroll Now
											</Link>
										</Button>
									</div>
								</>
							) : (
								<div className='mx-auto items-center justify-center text-center'>
									<p className='py-10 text-base'>{`Please sign in to see this page content`}</p>
									<SignOutButton />
								</div>
							)}
						</TabsContent>
						<TabsContent value='instructor'>
							{user && isPaid ? (
								<TutorProfile
									tutorName={tutor.name ?? 'Tutor'}
									highestAverageRating={
										totalRating ?? 0
									}
								/>
							) : !isPaid ? (
								<>
									<div className='mx-auto items-center justify-center text-center'>
										<p className='py-10 text-base'>{`Enroll for this course to get complete access!`}</p>
										<Button asChild>
											<Link
												href={`/courses/${courseDetails.title}/pay`}>
												Enroll Now
											</Link>
										</Button>
									</div>
								</>
							) : (
								<div className='mx-auto items-center justify-center text-center'>
									<p className='py-10 text-base'>{`Please sign in to see this page content`}</p>
									<SignOutButton />
								</div>
							)}
						</TabsContent>
						<TabsContent value='reviews'>
							{user && isPaid ? (
								<SingleTutorReviews
									reviews={reviews ?? []}
									tutor={tutor}
								/>
							) : !isPaid ? (
								<>
									<div className='mx-auto items-center justify-center text-center'>
										<p className='py-10 text-base'>{`Enroll for this course to get complete access!`}</p>
										<Button asChild>
											<Link
												href={`/courses/${courseDetails.title}/pay`}>
												Enroll Now
											</Link>
										</Button>
									</div>
								</>
							) : (
								<div className='mx-auto items-center justify-center text-center'>
									<p className='py-10 text-base'>{`Please sign in to see this page content`}</p>
									<SignOutButton />
								</div>
							)}
						</TabsContent>
					</Tabs>
				</div>

				<div className='lg:col-span-2 flex flex-col gap-5'>
					<video
						width='400'
						height='315'
						controls
						className='w-full aspect-video'>
						<source
							src={courseDetails.videoUrl}
							type='video/mp4'
						/>
					</video>

					<div className='space-y-4 px-3 grid'>
						<h3 className='text-xl font-semibold'>
							Course Includes:
						</h3>
						<div className='space-y-4 w-full '>
							<div className='flex flex-row justify-between items-center'>
								<span className='text-green-600 flex items-center'>
									<Icons.NairaSignIcon />
									{'  '}
									Price:
								</span>
								<div className='font-bold'>
									<div className=''>
										Virtual/Physical
									</div>
									<div className=''>
										{`${formatToNaira(
											courseDetails.virtualPrice
										)}/${formatToNaira(
											courseDetails.physicalPrice
										)}`}
									</div>
								</div>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center gap-1.5'>
									<Icons.UserIcon />
									<span className=''>
										Instructor:
									</span>
								</div>

								<span className='font-bold'>
									{tutor.name}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center gap-1.5'>
									<Icons.ClockIcon />
									<span className=''>Duration:</span>
								</div>

								<span className='font-bold'>
									{courseDetails.duration}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center gap-1.5'>
									<Icons.BookOpenIcon />
									<span className=''>Classes:</span>
								</div>

								<span className='font-bold'>
									{courseDetails.noOfClass}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center gap-1.5'>
									<Icons.UsersIcon />
									<span className=''>Students:</span>
								</div>
								<span className='font-bold'>
									{numberOfRegistration?.length ?? 0}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center gap-1.5'>
									<Icons.GlobeIcon />
									<span className=''>Language:</span>
								</div>

								<span className='ml-0 font-bold'>
									{'English'}
								</span>
							</div>
							<hr />
							<div className='flex justify-between items-center'>
								<div className='text-green-600 flex items-center gap-1.5'>
									<Icons.BadgeCheckIcon />
									<span className=''>
										Certifications:
									</span>
								</div>

								<span className='font-bold'>
									{courseDetails.certificate
										? 'Yes'
										: 'No'}
								</span>
							</div>
						</div>
						<hr />
						{/* <Drawer>
							<DrawerTrigger className='grid w-full bg-black text-background font-medium text-xl px-5 py-3 rounded-full'>
								Register Now
							</DrawerTrigger>
							<DrawerContent>
								<CourseRegisterPage />
								<DrawerClose
									asChild
									className='mx-auto max-w-2xl mb-10'>
									<Button
										className='w-full rounded-full'
										variant='outline'>{`Cancel`}</Button>
								</DrawerClose>
							</DrawerContent>
						</Drawer> */}
						{!isPaid && (
							<div className='grid'>
								<Button
									className=' rounded-full'
									asChild>
									<Link
										href={`/courses/${courseDetails.title}/pay`}>
										Register Now
									</Link>
								</Button>
							</div>
						)}
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
