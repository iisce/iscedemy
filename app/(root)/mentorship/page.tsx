/**
 * MentorshipDashboardPage is a dynamic server-side rendered page that displays
 * the mentorship sessions for the currently authenticated user. It categorizes
 * the sessions into upcoming and past sessions and provides relevant details
 * for each session.
 *
 * @returns A React component that renders the mentorship dashboard page.
 *
 * @remarks
 * - Redirects unauthenticated users to the login page.
 * - Fetches mentorship sessions from the database based on the user's role
 *   (mentor or mentee).
 * - Displays upcoming and past mentorship sessions with details such as topic,
 *   course, scheduled time, duration, and participant information.
 * - Provides a "Manage Session" button for tutors to manage their sessions.
 * - Includes a navigation button to return to the tutor dashboard or courses
 *   page based on the user's role.
 *
 * @dynamic This page is marked as `force-dynamic` to ensure it is always
 *          server-side rendered.
 */
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import MeetingUrlDisplay from '@/components/shared/meeting-url-display';
import SetReminderButton from '@/components/shared/set-reminder-button';

export const dynamic = 'force-dynamic';

export default async function MentorshipDashboardPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const userId = session.user.id;
  const userRole = session.user.role;

  const mentorships = await db.mentorship.findMany({
    where: {
      OR: [
        { mentorId: userId },
        { menteeId: userId },
      ],
    },
    include: {
      mentor: true,
      mentee: true,
      course: true,
    },
    orderBy: { scheduledAt: 'asc' },
  });

  const upcomingSessions = mentorships.filter(
    (session) => session.scheduledAt > new Date() && !session.completed
  );
  const pastSessions = mentorships.filter(
    (session) => session.scheduledAt <= new Date() || session.completed
  );

  return (
    <MaxWidthWrapper className='max-w-5xl'>
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Mentorship Sessions</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="border p-4 rounded-md">
                <p className="text-lg font-semibold">
                  {session.topic || 'Mentorship Session'}
                </p>
                <p>Course: {session.course.title}</p>
                <p>With: {userRole === 'TUTOR' ? session.mentee?.name || 'Not booked' : session.mentor.name}</p>
                <p>Scheduled: {new Date(session.scheduledAt).toLocaleString()}</p>
                <p>Duration: {session.duration} minutes</p>
                <MeetingUrlDisplay meetingUrl={session.meetingUrl} scheduledAt={session.scheduledAt} />
                <div className="mt-2 flex gap-2">
                  <SetReminderButton
                    topic={session.topic || "Mentorship Session"}
                    scheduledAt={session.scheduledAt}
                    meetingUrl={session.meetingUrl}
                    duration={session.duration}
                  />
                  {userRole === 'TUTOR' && session.menteeId && (
                    <Link href={`/tutor/mentorship/${session.id}`}>
                      <Button variant="outline">Manage Session</Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming mentorship sessions.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Past Sessions</h2>
        {pastSessions.length > 0 ? (
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div key={session.id} className="border p-4 rounded-md">
                <p className="text-lg font-semibold">
                  {session.topic || 'Mentorship Session'}
                </p>
                <p>Course: {session.course.title}</p>
                <p>With: {userRole === 'TUTOR' ? session.mentee?.name || 'Not booked' : session.mentor.name}</p>
                <p>Scheduled: {new Date(session.scheduledAt).toLocaleString()}</p>
                <p>Duration: {session.duration} minutes</p>
                <MeetingUrlDisplay meetingUrl={session.meetingUrl} scheduledAt={session.scheduledAt} />
                {session.notes && <p>Notes: {session.notes}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No past mentorship sessions.</p>
        )}
      </div>

      <div className="mt-4">
          <Button asChild variant="outline">
        <Link href={userRole === 'TUTOR' ? '/tutor' : '/courses'}>
            Back to {userRole === 'TUTOR' ? 'Tutor Dashboard' : 'Courses'}
        </Link>
          </Button>
      </div>
    </div>
    </MaxWidthWrapper>
  );
}