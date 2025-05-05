import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

interface ProjectsSectionProps {
  params: { courseId: string };
}


export async function ProjectsSection({params }: ProjectsSectionProps) {

  const { courseId } = params;

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      Curriculum: {
        include: {
          modules: {
            include: {
              lessons: {
                orderBy: { order: "asc" },
              },
            },
            orderBy: { order: "asc" },
          },
        },
      },
      projects: {
        include: {
          submissions: {
            where: { userId: session.user.id },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      // reviews: {
      //   include: {
      //     user: true,
      //   },
      //   orderBy: { createdAt: "desc" },
      // },
    },
  });

  if (!course) {
    redirect("/courses");
  }

  const lessonIds = course.Curriculum?.[0]?.modules?.flatMap((module) =>
  module.lessons.map((lesson) => lesson.id)
  ) || [];

  const progress = await db.progress.findMany({
    where: {
      userId: session.user.id,
      lessonId: {
        in: lessonIds,
      },
    },
  });

  const progressMap = new Map(progress.map((p: any) => [p.lessonId, p]));
  
  return (
    <div className="mt-8">
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