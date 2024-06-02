import SingleCourse from '@/components/pages/courses/singleCourse/singleCourse';
import { notFound } from 'next/navigation'; 
import { Metadata } from 'next';
import { fetchCourseDetails } from '@/actions/metadata-course';
import FormError from '@/components/form-error';

export async function generateMetadata({params}: {params: {course: string}}): Promise<Metadata> {
  const courseDetails = await fetchCourseDetails(params.course);

  if (!courseDetails){
    notFound();
  }

  return {
    title: courseDetails.title,
    description: courseDetails.description,
    openGraph: {
      title: courseDetails.title, 
      description: courseDetails.description,
      url: `https://www.palmtechniq.com/courses/${params.course}`,
      siteName: 'PalmTechnIQ',
      images: [
        {
          url: courseDetails.description || '/innovation.jpg', 
          width: 800,
          height: 600,
          alt: courseDetails.title,
        },
      ],
    },
  };
}


export default async function CoursePage({ params }: { params: { course: string } }) {
  const courseDetails = await fetchCourseDetails(params.course);
  if (!courseDetails) {
    return <FormError message='Course not found!'/>
  }

  return <SingleCourse courseTitle={params.course} />;
}

