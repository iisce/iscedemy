import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface MentorshipSectionProps {
  mentorships: any[];
  userId: string;
  courseId: string;
}

export function MentorshipSection({ mentorships, userId, courseId }: MentorshipSectionProps) {
  return (
    <div className="w-full mx-auto p-5">
      <div className="grid gap-5 items-start">
        <h2 className="text-2xl font-semibold underline">Mentorship Sessions</h2>
        {mentorships.length > 0 ? (
          mentorships.map((session: any) => (
            <div key={session.id} className="flex flex-col space-y-2 py-3">
              <div className="text-lg font-semibold">{session.topic}</div>
              <p className="text-gray-700">
                <strong>Scheduled:</strong> {format(new Date(session.scheduledAt), 'PPP')}
              </p>
              <p className="text-gray-700">
                <strong>Duration:</strong> {session.duration} minutes
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {session.completed ? 'Completed' : 'Upcoming'}
              </p>
              <Separator className="w-full mt-2" />
            </div>
          ))
        ) : (
          <p className="text-gray-700 mt-4">
            No mentorship sessions scheduled. Book a session with your mentor to get personalized guidance!
          </p>
        )}
        <Button asChild className="mt-4 rounded-full">
          <Link href={`/mentorship/book?courseId=${courseId}`}>Schedule a Session</Link>
        </Button>
      </div>
    </div>
  );
}