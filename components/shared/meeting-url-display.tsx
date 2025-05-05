"use client";
import { format } from "date-fns";

interface MeetingUrlDisplayProps {
  meetingUrl: string | null;
  scheduledAt: Date;
}

/**
 * A React component that displays a meeting URL with conditional rendering based on the scheduled date.
 * If the meeting URL is not provided, a fallback message is displayed.
 * If the current date is on or after the scheduled date, the meeting URL is displayed as an active link.
 * Otherwise, the meeting URL is blurred and a message indicates when the link will become active.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.meetingUrl - The URL of the meeting. If not provided, a fallback message is shown.
 * @param {string | Date} props.scheduledAt - The scheduled date of the meeting. Used to determine if the link is active.
 * 
 * @returns {JSX.Element} The rendered component displaying the meeting URL or relevant messages.
 */

export default function MeetingUrlDisplay({ meetingUrl, scheduledAt }: MeetingUrlDisplayProps) {
  if (!meetingUrl) {
    return <p>Meeting URL: Not provided (contact the tutor for details)</p>;
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); 
  const scheduledDate = new Date(scheduledAt);
  scheduledDate.setHours(0, 0, 0, 0); 

  const isLinkActive = currentDate >= scheduledDate;
  const formattedDate = format(scheduledDate, "MMMM d, yyyy");

  return (
    <div>
      {isLinkActive ? (
        <p>
          Meeting URL:{' '}
          <a href={meetingUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
            Join Meeting
          </a>
        </p>
      ) : (
        <div>
          <p>
            Meeting URL:{' '}
            <span className="inline-block filter blur-sm cursor-not-allowed text-gray-500">
              {meetingUrl}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            This link will be active on {formattedDate}. Please set a reminder!
          </p>
        </div>
      )}
    </div>
  );
}