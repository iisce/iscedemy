import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SubmissionReviewForm from '@/components/component/forms/submission-review-form';

export const dynamic = 'force-dynamic';

interface AssignmentSubmissionsPageProps {
  params: { courseId: string; projectId: string };
}

export default async function AssignmentSubmissionsPage({ params }: AssignmentSubmissionsPageProps) {
  const { courseId, projectId } = params;

  // Ensure the user is a tutor
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  if (session.user?.role !== 'TUTOR') {
    redirect('/auth/signin');
  }

  // Fetch course, assignment, and submissions
  const course = await db.course.findUnique({
    where: { id: courseId, tutorId: session.user.id },
  });

  if (!course) {
    redirect('/tutor');
  }

  const assignment = await db.project.findUnique({
    where: { id: projectId, courseId },
    include: {
      submissions: {
        include: {
          user: true,
        },
        orderBy: { submittedAt: 'desc' },
      },
    },
  });

  if (!assignment) {
    redirect(`/tutor/courses/${courseId}`);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Submissions for {assignment.title}</h1>
      <div className="mb-6">
        <Link href={`/tutor/courses/${courseId}`}>
          <Button variant="outline">Back to Course</Button>
        </Link>
      </div>
      {assignment.submissions.length > 0 ? (
        <div className="space-y-6">
          {assignment.submissions.map((submission) => (
            <div key={submission.id} className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold">{submission.user.name}</h3>
              <p className="text-muted-foreground">Submitted on: {new Date(submission.submittedAt).toLocaleDateString()}</p>
              <p className="mt-2">{submission.content}</p>
              {submission.fileUrl && (
                <p>
                  File: <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">{submission.fileUrl}</a>
                </p>
              )}
              {submission.grade && <p>Grade: {submission.grade}</p>}
              {submission.feedback && <p>Feedback: {submission.feedback}</p>}
              <div className="mt-4">
                <SubmissionReviewForm submissionId={submission.id} initialGrade={submission.grade} initialFeedback={submission.feedback} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No submissions yet for this assignment.</p>
      )}
    </div>
  );
}