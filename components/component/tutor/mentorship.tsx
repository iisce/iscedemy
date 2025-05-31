// components/component/tutor/mentorship.tsx
'use client'; // Add this to ensure it's a Client Component

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface MentorshipSectionProps {
  params: { courseId: string };
  mentorships: any[];
}

/**
 * Renders the MentorshipSection component, which displays available mentorship slots
 * for a specific course using pre-fetched data.
 *
 * @param {MentorshipSectionProps} props - The props for the MentorshipSection component.
 * @param {Object} props.params - The parameters passed to the component.
 * @param {string} props.params.courseId - The ID of the course for which mentorship slots are displayed.
 * @param {any[]} props.mentorships - Pre-fetched mentorship slots data.
 *
 * @returns {JSX.Element} A JSX element containing the mentorship slots or a message indicating
 *                        no slots are available.
 */
export function MentorshipSection({ params, mentorships }: MentorshipSectionProps) {
  const { courseId } = params;
  const session = useSession();
 const  user = session.data?.user

  return (
    <div className="w-full mx-auto p-5">
      <div className="grid gap-5 items-start">
        <h2 className="text-xl font-semibold mb-4">Available Mentorship Slots</h2>
        {mentorships.length > 0 ? (
          <div className="space-y-4">
            {mentorships.map((slot) => (
              <div key={slot.id} className="border p-4 rounded-md">
                <p className="text-lg font-semibold">
                  {slot.topic || 'Mentorship Session'}
                </p>
                <p>With: {slot.mentor.name}</p>
                <p>Scheduled: {new Date(slot.scheduledAt).toLocaleString()}</p>
                <p>Duration: {slot.duration} minutes</p>
                {slot.menteeId === user?.id ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-semibold">Booked</p>
                    <Button asChild variant="outline">
                      <Link href="/mentorship">
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