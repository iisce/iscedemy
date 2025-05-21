'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import TutorProfile from '@/components/component/tutor/tutor-profile';
import { SingleTutorReviews } from '@/components/component/tutor/tutor-reviews';
import { MentorshipSection } from '@/components/component/tutor/mentorship';
import { ProjectsSection } from '@/components/component/student/project-section';
import SignOutButton from '@/components/ui/sign-out';
import Link from 'next/link';
import SingleCourseCurriculum from '../pages/courses/singleCourse/singleCourseCurriculum';

interface CourseTabsProps {
  courseTitle: string;
  tab: string | undefined;
  user: any;
  isPaid: boolean;
  modules: any[];
  progress: any[];
  tutor: any;
  totalRating: number;
  reviews: any[];
  courseDetails: any;
  mentorships: any[];
  projects: any[];
  progressMap: Map<any, any>;
}

export default function CourseTabs({
  courseTitle,
  tab,
  user,
  isPaid,
  modules,
  progress,
  tutor,
  totalRating,
  reviews,
  courseDetails,
  mentorships,
  projects,
  progressMap,
}: CourseTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab || 'overview');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Check screen width for dropdown visibility
  useEffect(() => {
    const handleResize = () => {
      setIsDropdownVisible(window.innerWidth < 768); // Show dropdown below md breakpoint (768px)
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/courses/${courseTitle}?tab=${value}`, { scroll: false });
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className='w-full'>
      <TabsList className='grid grid-cols-4 gap-2 justify-center'>
        <TabsTrigger value='overview' className='px-4 py-2'>
          Overview
        </TabsTrigger>
        <TabsTrigger value='curriculum' className='px-4 py-2'>
          Curriculum
        </TabsTrigger>
        <TabsTrigger value='instructor' className='px-4 py-2'>
          Instructor
        </TabsTrigger>
        <TabsTrigger value='reviews' className='px-4 py-2'>
          Reviews
        </TabsTrigger>
        {isDropdownVisible && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='px-4 py-2'>
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleTabChange('mentorship')}>
                Mentorship
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTabChange('projects')}>
                Projects
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!isDropdownVisible && (
          <>
            <TabsTrigger value='mentorship' className='px-4 py-2'>
              Mentorship
            </TabsTrigger>
            <TabsTrigger value='projects' className='px-4 py-2'>
              Projects
            </TabsTrigger>
          </>
        )}
      </TabsList>
      <TabsContent value='overview'>
        <div className='text-wrap'>
          <h2 className='md:text-2xl text-xl font-bold'>
            Course Description
          </h2>
          <p className='mt-4 text-gray-700'>
            {courseDetails.description}
          </p>
          <h3 className='mt-6 md:text-xl text-lg font-semibold'>
            What You'll Learn?
          </h3>
          <ul className='list-disc pl-6 mt-4 space-y-2 text-gray-600'>
            {courseDetails.summary
              .split('---')
              .map((summaryList: string, i: number) => (
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
            modules={modules}
            progress={progress}
          />
        ) : !isPaid ? (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>{`Enroll for this course to get complete access!`}</p>
            <Button asChild className='w-full md:w-auto'>
              <Link href={`/courses/${courseTitle}/pay`}>
                Enroll Now
              </Link>
            </Button>
          </div>
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
            highestAverageRating={totalRating ?? 0}
          />
        ) : !isPaid ? (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>{`Enroll for this course to get complete access!`}</p>
            <Button asChild className='w-full md:w-auto'>
              <Link href={`/courses/${courseTitle}/pay`}>
                Enroll Now
              </Link>
            </Button>
          </div>
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
            courseId={courseDetails.id}
          />
        ) : !isPaid ? (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>{`Enroll for this course to get complete access!`}</p>
            <Button asChild className='w-full md:w-auto'>
              <Link href={`/courses/${courseTitle}/pay`}>
                Enroll Now
              </Link>
            </Button>
          </div>
        ) : (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>{`Please sign in to see this page content`}</p>
            <SignOutButton />
          </div>
        )}
      </TabsContent>
      <TabsContent value='mentorship'>
        {user && isPaid ? (
          <MentorshipSection mentorships={mentorships} params={{courseId: courseDetails.id}} />
        ) : !isPaid ? (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>Enroll for this course to get complete access!</p>
            <Button asChild className='w-full md:w-auto'>
              <Link href={`/courses/${courseTitle}/pay`}>Enroll Now</Link>
            </Button>
          </div>
        ) : (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>Please sign in to see this page content</p>
            <SignOutButton />
          </div>
        )}
      </TabsContent>
      <TabsContent value='projects'>
        {user && isPaid ? (
          <ProjectsSection projects={projects} progressMap={progressMap} params={{ courseId: courseDetails.id }} />
        ) : !isPaid ? (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>Enroll for this course to get complete access!</p>
            <Button asChild className='w-full md:w-auto'>
              <Link href={`/courses/${courseTitle}/pay`}>Enroll Now</Link>
            </Button>
          </div>
        ) : (
          <div className='mx-auto items-center justify-center text-center'>
            <p className='py-10 text-base'>Please sign in to see this page content</p>
            <SignOutButton />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}