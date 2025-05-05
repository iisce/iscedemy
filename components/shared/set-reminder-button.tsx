"use client";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { CalendarPlus } from "lucide-react";

interface SetReminderButtonProps {
  topic: string;
  scheduledAt: Date;
  meetingUrl?: string | null;
  duration: number;
}

/**
 * A React component that renders a button to set a reminder for a scheduled event.
 * The button generates a Google Calendar link with the provided event details
 * and opens it in a new tab when clicked.
 *
 * @param {SetReminderButtonProps} props - The properties for the component.
 * @param {string} props.topic - The topic or title of the event. Defaults to "Mentorship Session" if not provided.
 * @param {string} props.scheduledAt - The ISO string representing the start date and time of the event.
 * @param {string} props.meetingUrl - The URL for the meeting. If provided, it will be included in the event details.
 * @param {number} props.duration - The duration of the event in minutes. Used to calculate the end time.
 *
 * @returns {JSX.Element} A button element that allows users to set a reminder in Google Calendar.
 */
export default function SetReminderButton({ topic, scheduledAt, meetingUrl, duration }: SetReminderButtonProps) {
  const createGoogleCalendarLink = () => {
    const startDate = new Date(scheduledAt);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000); 

   

    const eventDetails = {
      text: encodeURIComponent(topic || "Mentorship Session"),
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: encodeURIComponent(meetingUrl ? `Join the mentorship session with PalmTechnIQ tutor: ${meetingUrl}` : "Mentorship session with PalmTechnIQ"),
      location: encodeURIComponent(meetingUrl || "Online"),
    };

    return `https://calendar.google.com/calendar/r/eventedit?text=${eventDetails.text}&dates=${eventDetails.dates}&details=${eventDetails.details}&location=${eventDetails.location}`;
  };

  return (
    <Button
      variant="outline"
      onClick={() => window.open(createGoogleCalendarLink(), "_blank")}
      className="flex items-center gap-2"
    >
      <CalendarPlus className="h-4 w-4" />
      Set Reminder
    </Button>
  );
}