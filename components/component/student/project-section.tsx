// components/component/student/project-section.tsx
'use client'; // Add this to ensure it's a Client Component

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectsSectionProps {
  params: { courseId: string };
  projects: any[];
  progressMap: Map<any, any>;
}

export function ProjectsSection({ params, projects, progressMap }: ProjectsSectionProps) {
  const { courseId } = params;
  const session = useSession();
const user = session.data?.user;
  const router = useRouter();

  // Redirect to login if not authenticated
  if (!user?.id) {
    router.push('/login');
    return null;
  }

  // Show loading state while session is being fetched
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Assignments</h2>
      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              {project.dueDate && (
                <p>Due: {new Date(project.dueDate).toLocaleDateString()}</p>
              )}
              {project.submissions.length > 0 ? (
                <div className="mt-2">
                  <p className="text-green-600">Submitted</p>
                  {project.submissions[0].grade && (
                    <p>Grade: {project.submissions[0].grade}</p>
                  )}
                  {project.submissions[0].feedback && (
                    <p>Feedback: {project.submissions[0].feedback}</p>
                  )}
                </div>
              ) : (
                <div className="mt-2">
                  <Link href={`/courses/${courseId}/assignments/submit/${project.id}`}>
                    <Button>Submit Assignment</Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No assignments available for this course.</p>
      )}
    </div>
  );
}