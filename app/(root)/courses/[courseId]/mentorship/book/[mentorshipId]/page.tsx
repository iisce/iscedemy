/**
 * MentorshipBookPage component is responsible for rendering the mentorship booking page.
 * It ensures that the user is authenticated, validates the course and mentorship details,
 * and provides functionality to book a mentorship slot.
 *
 * @param {MentorshipBookPageProps} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.courseId - The ID of the course.
 * @param {string} props.params.mentorshipId - The ID of the mentorship session.
 *
 * @returns {Promise<JSX.Element>} The JSX element representing the mentorship booking page.
 *
 * @remarks
 * - Redirects to the login page if the user is not authenticated.
 * - Redirects to the courses page if the course or mentorship session is invalid.
 * - Redirects to the course page if the mentorship session is already booked or expired.
 * - Provides a form to book the mentorship slot, which updates the mentee ID in the database.
 *
 * @example
 * ```tsx
 * // Example usage in a Next.js app
 * <MentorshipBookPage params={{ courseId: '123', mentorshipId: '456' }} />
 * ```
 */
import { auth } from '@/auth';
import MeetingUrlDisplay from '@/components/shared/meeting-url-display';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { courseUrl } from '@/lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
export const dynamic = 'force-dynamic';

interface MentorshipBookPageProps {
    params: { courseId: string; mentorshipId: string };
}


export default async function MentorshipBookPage({params}: MentorshipBookPageProps) {

    const { courseId, mentorshipId } = params;

    const session = await auth();
    if(!session){
        redirect('/login');
    }

    const course = await db.course.findUnique({
        where: {id: courseId},
    });

    if(!course){
        redirect('/courses');
    }

    const mentorship = await db.mentorship.findUnique({
        where: { id: mentorshipId, courseId },
        include: {
            mentor: true,
        },
    });

    if(!mentorship) {
        redirect(courseUrl(course, true));
    }
    if(mentorship.menteeId) {
        redirect(courseUrl(course, true));
    }

    if(mentorship.scheduledAt < new Date()) {
        redirect(courseUrl(course, true));
    }

    const bookSlot = async () => {
        "use server";

        try {
            await db.mentorship.update({
                where: { id: mentorshipId },
                data: {
                    menteeId: session.user.id,
                },
            });
            return {success: "Mentorship slot booked successfully!"};
        } catch (error) {
            console.error("Error booking mentorship slot:", error);
            return {error: "Failed to book mentorship slot. Please try again!"};
        }
    }
  return (
    <div className="mx-auto container py-8">
        <h1 className='text-2xl font-bold mb-6'>Book Mentorship Slot</h1>
        <div className="border p-4 rounded-md mb-6">
        <p className="text-lg font-semibold">{mentorship.topic || 'Mentorship Session'}</p>
        <p>With: {mentorship.mentor.name}</p>
        <p>Scheduled: {new Date(mentorship.scheduledAt).toLocaleString()}</p>
        <p>Duration: {mentorship.duration} minutes</p>
        <MeetingUrlDisplay meetingUrl={mentorship.meetingUrl} scheduledAt={mentorship.scheduledAt}/>
        </div>

        <form action={async () => {
            "use server";

            const result = await bookSlot();
            if(result.success) {
                return redirect(courseUrl(course, true) || 'Successfully Booked Mentorship!'); // Redirect with success message
            }else {
                redirect(courseUrl(course, true) || 'Failed to book slot, please try again!'); // Redirect with error message
            }
        }}>
            <Button type='submit' className="bg-green-600 hover:bg-green-700 text-white" >
            Confirm Booking
            </Button>
        </form>

        <div className="mt-4">
            <Button  asChild variant="outline">
                <Link href={courseUrl(course, true)}>
                Back to Course
                </Link>
            </Button>
        </div>
    </div>
  )
}
