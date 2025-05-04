import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SubmissionForm from '@/components/component/forms/submission-form';
import { courseUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface AssignmentSubmitPageProps {
  params: { courseId: string; projectId: string };
}

export default async function AssignmentSubmitPage({ params }: AssignmentSubmitPageProps) {
  const {courseId, projectId } = params;
  if (!courseId || !projectId) {
    redirect('/courses');
  }
  // Ensure the user is authenticated
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  // Fetch course and assignment details
  const course = await db.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    redirect('/courses');
  }

  const assignment = await db.project.findUnique({
    where: { id: projectId },
    include: {
      submissions: {
        where: { userId: session.user.id },
      },
    },
  });

  if (!assignment) {
    redirect(courseUrl(course, true));
  }

  if (assignment.submissions.length > 0) {
    redirect(courseUrl(course, true));
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Submit Assignment: {assignment.title}</h1>
      <SubmissionForm courseId={courseId} projectId={projectId} />
      <div className="mt-4">
          <Button asChild variant="outline">
        <Link href={courseUrl(course, true)}>
        Back to Course
        </Link>
        </Button>
      </div>
    </div>
  );
}