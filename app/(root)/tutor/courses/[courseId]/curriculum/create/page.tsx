import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import CreateCurriculumForm from '@/components/component/forms/create-curriculum-form';
import { getAllCourses } from '@/data/course';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Create Curriculum - PalmtechnIQ',
    description: 'Stay in-charge of your courses and keep track of your revenue!',
    // metadataBase: new URL('https://www.palmtechniq.com/tutor'),
    alternates:{
      canonical: '/tutor',
      languages: {
      'en-US':'/en-US',
      'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: 'Create Curriculum - PalmtechnIQ',
      description: 'Stay in-charge of your courses and keep track of your revenue!',
    //   url: 'https://www.palmtechniq.com/tutor',
      siteName: 'PalmTechnIQ',
      images: '/christina.jpg'
    }
    }

interface CurriculumCreatePageProps {
  params: { courseId: string };
}

export default async function CurriculumCreatePage({ params }: CurriculumCreatePageProps) {
  const { courseId } = params;

  const session = await auth();
  if (!session || session.user?.role !== 'TUTOR') {
    redirect('/login');
  }


   const cookieStore = cookies();
  const sessionToken = cookieStore.get('authjs.session-token')?.value;
  const endpointUrl = `${process.env.NEXT_PUBLIC_URL}/api/curriculum/has/${courseId}`
  console.log({endpointUrl})
  const response = await fetch( endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      ...(sessionToken && { Cookie: `authjs.session-token=${sessionToken}` }),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    if (data.error.includes("Unauthorized")) {
      redirect('/login');
    }
    throw new Error(data.error || "Failed to check curriculum status");
  }

  const { hasCurriculum: curriculumExists } = await response.json();

  let existingCurriculum = null;
  if (curriculumExists) {
    existingCurriculum = await db.curriculum.findUnique({
      where: { courseId },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    });
  }

  const courses = await getAllCourses();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {curriculumExists ? 'Update Curriculum' : 'Create Curriculum'} for Course {courses.find(course => course.id === courseId)?.title}
      </h1>
      <CreateCurriculumForm
        courseId={courseId}
        existingCurriculum={existingCurriculum}
      />
      <div className="mt-4">
        <Link href={`/tutor/courses/${courseId}`}>
          <Button variant="outline">Back to Course</Button>
        </Link>
      </div>
    </div>
  );
}