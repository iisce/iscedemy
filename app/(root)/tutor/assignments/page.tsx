import { auth } from "@/auth";
import AssignmentsPage from "@/components/pages/tutor/assignments-page";
import { getAllCoursesByTutor } from "@/data/tutor";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tutor Assignments',
  description: 'Review and grade assignment submissions from your students.',
  metadataBase: new URL('https://www.palmtechniq.com/tutor/assignments'),
  alternates: {
    canonical: '/tutor/assignments',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Tutor Assignments',
    description: 'Review and grade assignment submissions from your students.',
    url: 'https://www.palmtechniq.com/tutor/assignments',
    siteName: 'PalmTechnIQ',
    images: '/assignments.jpg'
  }
}

export default async function TutorAssignmentsPage() {
  const session = await auth();
  if (!session) {
    redirect('/login'); 
  }

  if (session?.user?.role !== 'TUTOR') {
    redirect('/login');
    return null;
  }

  const tutor = await getUserById(session?.user?.id ?? '');
  if (!tutor) {
    redirect("/login");
    return null;
  }

  const courses = await getAllCoursesByTutor(tutor?.id!);
  const tutorCourses = courses.map(course => course.id);

  const submissions = await db.projectSubmission.findMany({
    where: {
      project: {
        courseId: { in: tutorCourses },
      },
    },
    include: {
      user: true,
      project: {
        include: {
          course: true,
        },
      },
    },
    orderBy: {
      submittedAt: "desc",
    },
  });

  const courseId = courses.length > 0 ? courses[0].id : null;

  return (
    <AssignmentsPage
      tutor={tutor}
      courses={courses}
      submissions={submissions}
      courseId={courseId!}
    />
  );
}