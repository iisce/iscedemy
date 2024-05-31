import { Metadata } from 'next';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import SideBar from '@/components/layout/sidebar';
import { fetchCourseDetails } from '@/actions/metadata-course';

async function getCourseMetadata(courseTitle: string): Promise<Metadata> {
  const courseDetails = await fetchCourseDetails(courseTitle);
  if (!courseDetails) {
    return {
      title: 'Course Not Found',
      description: 'The requested course was not found.',
    };
  }

  return {
	title: { 
		template: `%s | ${courseDetails.title}`, // Add the course title to the title
		default: 'PalmTechniq', 
	  },
    description: courseDetails.description,
    openGraph: {
      title: courseDetails.title,
      description: courseDetails.description,
      url: `https://www.palmtechniq.com/courses/${courseTitle}`,
      siteName: 'PalmTechnIQ',
      images: [
        {
          url: courseDetails.description || '/innovation.jpg', // Use course image if available
          width: 800,
          height: 600,
          alt: courseDetails.title,
        },
      ],
    },
  };
}

export default async function CourseLayout({ children, params }: { children: React.ReactNode; params: { courseTitle: string } }) {
  const metadata = await getCourseMetadata(params.courseTitle); // Fetch metadata

  return (
    <div>
      <MaxWidthWrapper>
        <div className='flex h-full gap-5'>
          <SideBar />
          {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
