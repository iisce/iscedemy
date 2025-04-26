"use server";
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

interface CourseDetailsPageProps {
  params: { courseId: string };
}

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
    },
  });

  if (!course) {
    redirect('/tutor');
  }

  // Get the session cookie to forward to the API request
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('authjs.session-token')?.value;

  // Check if a curriculum exists using the API
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/curriculum/has/${courseId}`, {
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
    <div className="container mx-auto py-8">
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
          <Link href="/tutor">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
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
                  <Link href={`/tutor/courses/${courseId}/assignments/${project.id}`}>
                    <Button variant="outline">View Submissions</Button>
                  </Link>
                  <Link href={`/tutor/courses/${courseId}/assignments/edit/${project.id}`}>
                    <Button variant="outline">Edit Assignment</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No assignments available for this course. Create one to get started!</p>
        )}
      </div>
    </div>
  );
}