import { auth } from "@/auth";
import CoursesPage from "@/components/pages/tutor/course-page";
import { getAllCoursesByTutor, getEarningsForCourse, getEnrollmentsForCourse } from "@/data/tutor";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tutor Courses',
  description: 'Manage your courses and track their performance.',
  metadataBase: new URL('https://www.palmtechniq.com/tutor/courses'),
  alternates: {
    canonical: '/tutor/courses',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Tutor Courses',
    description: 'Manage your courses and track their performance.',
    url: 'https://www.palmtechniq.com/tutor/courses',
    siteName: 'PalmTechnIQ',
    images: '/courses.jpg'
  }
}

export default async function tutorCoursesPage(){
    const session = await auth();
    if(!session){
        redirect("/login")
    }

    if(session.user.role !== 'TUTOR'){
        redirect('/unauthorized');
        return null;
    }

    const tutor = await getUserById(session.user.id ?? "");
    if(!tutor){
        redirect('/unauthorized');
        return null;
    }

    const courses = await getAllCoursesByTutor(tutor.id!);

    const enrollmentsData: {[key: string]: number} = {};
    for (const course of courses) {
        const enrollmentsCount = await getEnrollmentsForCourse(course.id);
    }

    const earningsData: { [key: string]: number } = {};
  for (const course of courses) {
    const earnings = await getEarningsForCourse(course.id);
    earningsData[course.id] = earnings;
  }

  const curriculumStatus: { [key: string]: boolean } = {};
  for (const course of courses) {
    const curriculum = await db.curriculum.findUnique({
      where: { courseId: course.id },
    });
    curriculumStatus[course.id] = !!curriculum;
  }

  return (
    <CoursesPage 
    tutor={tutor}
      courses={courses}
      enrollments={enrollmentsData}
      earnings={earningsData}
      curriculumStatus={curriculumStatus}
    />
  )
}