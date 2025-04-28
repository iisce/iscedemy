import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AssignmentForm from '@/components/component/forms/create-assignment-form';

export const dynamic = 'force-dynamic';

interface AssignmentCreatePageProps {
  params: { courseId: string };
}

export default async function AssignmentCreatePage({ params }: AssignmentCreatePageProps) {
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
    where: { id: courseId },
  });

  if (!course) {
    redirect('/tutor');
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create Assignment for {course.title}</h1>
      <AssignmentForm courseId={courseId} />
      <div className="mt-4">
        <Link href={`/tutor/courses/${courseId}`}>
          <Button variant="outline">Back to Course</Button>
        </Link>
      </div>
    </div>
  );
}