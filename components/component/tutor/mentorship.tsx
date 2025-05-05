import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface MentorshipSectionProps {
  params: {courseId: string};
}

/**
 * Renders the MentorshipSection component, which displays available mentorship slots
 * for a specific course. It fetches the course data, including mentorships and projects,
 * and ensures the user is authenticated before rendering the content.
 *
 * @param {MentorshipSectionProps} props - The props for the MentorshipSection component.
 * @param {Object} props.params - The parameters passed to the component.
 * @param {string} props.params.courseId - The ID of the course for which mentorship slots are displayed.
 *
 * @returns {JSX.Element} A JSX element containing the mentorship slots or a message indicating
 *                        no slots are available.
 *
 * @throws Will redirect to the login page if the user is not authenticated.
 * @throws Will redirect to the courses page if the course is not found.
 *
 * @remarks
 * - The mentorship slots are filtered to include only those that are unscheduled
 *   (`menteeId` is undefined) and scheduled for a future date.
 * - The mentorship slots are ordered by their scheduled date in ascending order.
 * - The projects include submissions filtered by the authenticated user's ID.
 *
 * @example
 * ```tsx
 * <MentorshipSection params={{ courseId: "12345" }} />
 * ```
 */
export async function MentorshipSection({ params }: MentorshipSectionProps) {

  const { courseId } = params;

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
     
      projects: {
        include: {
          submissions: {
            where: { userId: session.user.id },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      mentorships: {
        where: {
          menteeId: undefined,
          scheduledAt: { gt: new Date() },
        },
        include: {
          mentor: true,
        },
        orderBy: { scheduledAt: 'asc' },
      },
    },
  });

  if (!course) {
    redirect("/courses");
  }


  return (
    <div className="w-full mx-auto p-5">
      <div className="grid gap-5 items-start">
      <h2 className="text-xl font-semibold mb-4">Available Mentorship Slots</h2>
      {course.mentorships.length > 0 ? (
        <div className="space-y-4">
        {course.mentorships.map((slot) => (
          <div key={slot.id} className="border p-4 rounded-md">
          <p className="text-lg font-semibold">
            {slot.topic || 'Mentorship Session'}
          </p>
          <p>With: {slot.mentor.name}</p>
          <p>Scheduled: {new Date(slot.scheduledAt).toLocaleString()}</p>
          <p>Duration: {slot.duration} minutes</p>
          {slot.menteeId === session.user.id ? (
            <div className='space-y-2'>
            <p className="text-green-600 font-semibold">Booked</p>
            <Button asChild variant="outline">
            <Link href='/mentorship'>
            Manage Slot
            </Link>
            </Button>
            </div>
          ) : (
            <Button asChild>
            <Link href={`/courses/${courseId}/mentorship/book/${slot.id}`}>
            Book Slot
            </Link>
            </Button>
          )}
          </div>
        ))}
        </div>
      ) : (
        <p>No mentorship slots available for this course.</p>
      )}
      </div>
    </div>
  );
}