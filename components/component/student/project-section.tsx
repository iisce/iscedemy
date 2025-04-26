import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface ProjectsSectionProps {
  projects: any[];
  userId: string;
  courseId: string;
}

export function ProjectsSection({ projects, userId, courseId }: ProjectsSectionProps) {
  // In a real implementation, you'd fetch submissions to check if the user has submitted
  // For now, we'll assume no submissions exist for simplicity
  return (
    <div className="w-full mx-auto p-5">
      <div className="grid gap-5 items-start">
        <h2 className="text-2xl font-semibold underline">Course Projects</h2>
        {projects.length > 0 ? (
          projects.map((project: any) => (
            <div key={project.id} className="flex flex-col space-y-2 py-3">
              <div className="text-lg font-semibold">{project.title}</div>
              <p className="text-gray-700">{project.description}</p>
              <p className="text-gray-700">
                <strong>Due Date:</strong> {project.dueDate ? format(new Date(project.dueDate), 'PPP') : 'No due date'}
              </p>
              <Button asChild variant="outline" className="mt-2">
                <Link href={`/projects/${project.id}/submit`}>Submit Project</Link>
              </Button>
              <Separator className="w-full mt-2" />
            </div>
          ))
        ) : (
          <p className="text-gray-700 mt-4">
            No projects assigned for this course. Check back later for hands-on assignments!
          </p>
        )}
      </div>
    </div>
  );
}