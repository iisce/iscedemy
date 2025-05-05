"use server";
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import MeetingUrlDisplay from '@/components/shared/meeting-url-display';

interface CourseDetailsPageProps {
	params: { courseId: string };
}

/**
 * CourseDetailsPage is a server-side rendered page component that displays detailed information
 * about a specific course for tutors. It includes course details, assignments, and mentorship slots,
 * along with actions to manage curriculum, assignments, and mentorship sessions.
 *
 * @param {CourseDetailsPageProps} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.courseId - The unique identifier of the course.
 *
 * @returns {JSX.Element} The rendered course details page.
 *
 * @async
 * @throws Will redirect to the login page if the user is not authenticated or not a tutor.
 * @throws Will redirect to the tutor dashboard if the course does not exist.
 * @throws Will throw an error if the curriculum status API request fails.
 *
 * @remarks
 * - The page ensures that only authenticated users with the "TUTOR" role can access it.
 * - It fetches course details, including associated projects (assignments) and mentorship slots.
 * - It checks the existence of a curriculum for the course using an API request.
 * - Provides actions for tutors to create or update curriculum, assignments, and mentorship slots.
 *
 * @dependencies
 * - `auth` for user authentication.
 * - `db.course.findUnique` for fetching course details from the database.
 * - `cookies` for accessing session cookies.
 * - `fetch` for making API requests.
 * - `redirect` for server-side redirection.
 * - `MaxWidthWrapper`, `Button`, and `Link` for UI components.
 */
export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
	const { courseId } = params;

	// Ensure the user is a tutor
	const session = await auth();

	if (!session) {
		redirect('/login'); // Redirect to login if not authenticated
	}
	if (session.user?.role !== 'TUTOR') {
		redirect('/login');
	}

	// Fetch course details
	const course = await db.course.findUnique({
		where: { id: courseId },
		include: {
			projects: {
				orderBy: {createdAt: 'desc'},
			},
			mentorships: {
				orderBy: {scheduledAt: 'desc'},
				take: 3,
				include: {
					mentee: true, 
				},
			},
		},
	});

	if (!course) {
		redirect('/tutor');
	}

	// Get the session cookie to forward to the API request
	const cookieStore = cookies();
	const sessionCookie = cookieStore.get('authjs.session-token')?.value;

	const endpointUrl = `${process.env.NEXT_PUBLIC_URL}/api/curriculum/has/${courseId}`
	console.log({endpointUrl})
	// Check if a curriculum exists using the API
	const response = await fetch(endpointUrl, {
		headers: {
			"Content-Type": "application/json",
			...(sessionCookie && { Cookie: `authjs.session-token=${sessionCookie}` }),
		},
	});

	if (!response.ok) {
		const data = await response.json();
		if (data.error.includes("Unauthorized")) {
			redirect('/login');
		}
		throw new Error(data.error || "Failed to check curriculum status");
	}

	const { hasCurriculum: curriculumExists } = await response.json();

	return (
    <MaxWidthWrapper>
		<div className="container gap-5 mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">{course.title}</h1>
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<p className="text-muted-foreground mb-4">{course.description}</p>
				<div className="flex items-center gap-3">
					<Button asChild className="bg-green-600 hover:bg-green-700 text-white">
					<Link href={`/tutor/courses/${courseId}/curriculum/create`}>
						{curriculumExists ? 'Update Curriculum' : 'Create Curriculum'}
					</Link>
						</Button>

						<Button asChild className="bg-green-600 hover:bg-green-700 text-white">
					<Link href={`/tutor/courses/${courseId}/assignments/create`}>
						Create Assignment
					</Link>
						</Button>

					<Button asChild className="bg-green-600 hover:bg-green-700 text-white">
						<Link href={`/tutor/courses/${courseId}/mentorship/create`}>
							Create Mentorship Slot
						</Link>
							</Button>

						<Button asChild variant="outline">
					<Link href="/tutor">Back to Dashboard
					</Link>
					</Button>

				</div>
			</div>
      <div className="grid grid-cols-2 gap-3">
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">Assignments</h2>
				{course.projects.length > 0 ? (
					<div className="space-y-4">
						{course.projects.map((project) => (
							<div key={project.id} className="border p-4 rounded-md">
								<h3 className="text-lg font-semibold">{project.title}</h3>
								<p className="text-muted-foreground">{project.description}</p>
								{project.dueDate && (
									<p>Due: {new Date(project.dueDate).toLocaleDateString()}</p>
								)}
								<div className="mt-2 flex gap-2">
									<Button asChild variant="outline">
									<Link href={`/tutor/courses/${courseId}/assignments/${project.id}`}>
									View Submissions
									</Link>
									</Button>

										<Button asChild variant="outline">
									<Link href={`/tutor/courses/${courseId}/assignments/edit/${project.id}`}>
									Edit Assignment
									</Link>
									</Button>


								</div>
							</div>
						))}
					</div>
				) : (
					<p>No assignments available for this course. Create one to get started!</p>
				)}
			</div>

			<div className="bg-white p-6 my-4 rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">Mentorship Slots</h2>
				{course.mentorships.length > 0 ? (
					<div className="space-y-4">
						{course.mentorships.map((slot) => (
							<div key={slot.id} className="border p-4 rounded-md">
								<p className="text-lg font-semibold">
									{slot.topic || 'Mentorship Session'}
								</p>
								<p>Scheduled: {new Date(slot.scheduledAt).toLocaleString()}</p>
								<p>Duration: {slot.duration} minutes</p>
								<MeetingUrlDisplay meetingUrl={slot.meetingUrl} scheduledAt={slot.scheduledAt} />
								<p>Status: {slot.completed ? 'Completed' : 'Upcoming'}</p>
								<p>Booked by: {slot.mentee ? slot.mentee.name : 'Not booked'}</p>
								{slot.notes && <p>Notes: {slot.notes}</p>}
								{!slot.completed && slot.mentee && (
									<Button asChild variant="outline">
									<Link href={`/tutor/mentorship/${slot.id}`}>
									Manage Session
									</Link>
									</Button>
								)}
							</div>
						))}
					</div>
				) : (
					<p>No mentorship slots available for this course. Create one to get started!</p>
				)}
			</div>
      </div>
		</div>
    </MaxWidthWrapper>
	);
}
