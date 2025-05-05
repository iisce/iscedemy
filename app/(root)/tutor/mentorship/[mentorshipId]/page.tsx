import { auth } from '@/auth';
import CompleteSessionForm from '@/components/component/forms/complete-session-form';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import MeetingUrlDisplay from '@/components/shared/meeting-url-display';
import SetReminderButton from '@/components/shared/set-reminder-button';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';


export const dynamic = 'force-dynamic';

interface MentorshipManagePageProps {
  params: { mentorshipId: string };
}

export default async function MentorshipManagePage({ params }: MentorshipManagePageProps) {
  const { mentorshipId } = params;

  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  if (session.user?.role !== 'TUTOR') {
    redirect('/login');
  }

  const mentorship = await db.mentorship.findUnique({
    where: { id: mentorshipId, mentorId: session.user.id },
    include: {
      mentee: true,
      course: true,
    },
  });

  if (!mentorship) {
    console.log('Mentorship not found, redirecting to /tutor');
    redirect('/tutor');
  }

  if (mentorship.completed) {
    console.log('No mentee or session completed, redirecting to /tutor/courses/', mentorship.courseId);
    redirect(`/tutor/courses/${mentorship.courseId}`);
  }

 
  return (
    <MaxWidthWrapper className='max-w-5xl'>
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Mentorship Session</h1>
      {mentorship.menteeId ? (
          <div className="border p-4 rounded-md mb-6">
            <p className="text-lg font-semibold">{mentorship.topic || 'Mentorship Session'}</p>
            <p>With: {mentorship.mentee ? mentorship.mentee.name : 'Unknown Mentee'}</p>
            <p>Course: {mentorship.course.title}</p>
            <p>Scheduled: {new Date(mentorship.scheduledAt).toLocaleString()}</p>
            <p>Duration: {mentorship.duration} minutes</p>

            <MeetingUrlDisplay meetingUrl={mentorship.meetingUrl} scheduledAt={mentorship.scheduledAt} />

            <div className="mt-2">
              <SetReminderButton
                topic={mentorship.topic || "Mentorship Session"}
                scheduledAt={mentorship.scheduledAt}
                meetingUrl={mentorship.meetingUrl}
                duration={mentorship.duration}
              />
            </div>
          </div>
        ) : (
          <div className="border p-4 rounded-md mb-6 bg-yellow-50 text-yellow-800">
            <p className="text-lg font-semibold">Session Not Booked Yet</p>
            <p>This mentorship slot has not been booked by a student. It will be available for booking on the course page.</p>
          </div>
        )}
        {mentorship.menteeId && <CompleteSessionForm mentorshipId={mentorshipId} courseId={mentorship.courseId} />}
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href={`/tutor/courses/${mentorship.courseId}`}>
              Back to Course
            </Link>
          </Button>
        </div>
    </div>
    </MaxWidthWrapper>
  );
}