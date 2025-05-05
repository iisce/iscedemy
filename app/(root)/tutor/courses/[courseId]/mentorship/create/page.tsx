import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import MentorshipForm from '@/components/component/forms/mentorship-form';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';

export const dynamic = 'force-dynamic';

interface MentorshipCreatePageProps {
  params: { courseId: string };
}

export default async function MentorshipCreatePage({ params }: MentorshipCreatePageProps) {
  const { courseId } = params;

  // Ensure the user is a tutor
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  if (session.user?.role !== 'TUTOR') {
    redirect('/login');
  }

  // Fetch course details
  const course = await db.course.findUnique({
    where: { id: courseId, tutorId: session.user.id },
  });

  if (!course) {
    redirect('/tutor');
  }

  return (
    <MaxWidthWrapper className='max-w-4xl'>
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create Mentorship Slot for {course.title}</h1>
      <MentorshipForm courseId={courseId} />
      <div className="mt-4">
        <Link href={`/tutor/courses/${courseId}`}>
          <Button variant="outline">Back to Course</Button>
        </Link>
      </div>
    </div>
    </MaxWidthWrapper>
  );
}