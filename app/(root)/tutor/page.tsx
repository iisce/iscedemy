import { auth } from "@/auth";
import TutorDashboard from "@/components/pages/dashboard/tutor-dashboard";
import { getAllReviewsByTutorName } from "@/data/reviews";
import { getAllCoursesByTutor, getEarningsForCourse, getEnrollmentsForCourse } from "@/data/tutor";
import { getUserById } from "@/data/user";
import { getProgressByStudentAndCourse, getTotalLessonsByCourse } from "@/data/progress";
import { getSubmissionsByStudentAndCourse } from "@/data/project-submission";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tutor Dashboard - PalmTechnIQ',
  description: 'Stay in-charge of your courses and keep track of your revenue!',
  metadataBase: new URL('https://www.palmtechniq.com/tutor'),
  alternates: {
    canonical: '/tutor',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Tutor Dashboard - PalmTechnIQ',
    description: 'Stay in-charge of your courses and keep track of your revenue!',
    url: 'https://www.palmtechniq.com/tutor',
    siteName: 'PalmTechnIQ',
    images: '/christina.jpg'
  }
}

export default async function TutorDashboardPage() {
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

  const reviewsArray = await getAllReviewsByTutorName(tutor?.name!) || [];
  const totalReviews = reviewsArray ? reviewsArray.length : 0;

  const enrollmentsData: { [key: string]: number } = {};
  for (const course of courses) {
    const enrollmentsCount = await getEnrollmentsForCourse(course.id);
    enrollmentsData[course.id] = enrollmentsCount;
  }

  const earningsData: { [key: string]: number } = {};
  let totalEarnings = 0;
  for (const course of courses) {
    const earnings = await getEarningsForCourse(course.id);
    earningsData[course.id] = earnings;
    totalEarnings += earnings;
  }

  // Fetch whether each course has a curriculum
  const curriculumStatus: { [key: string]: boolean } = {};
  for (const course of courses) {
    const curriculum = await db.curriculum.findUnique({
      where: { courseId: course.id },
    });
    curriculumStatus[course.id] = !!curriculum;
  }

  // Fetch all students enrolled in the tutor's courses
  const tutorCourses = courses.map(course => course.id);
  // console.log("Tutor Course IDs:", tutorCourses);

  const students = await db.user.findMany({
    where: {
      role: "STUDENT",
     OR: tutorCourses.map(courseId => ({
      courses: {
        contains: courseId,
      },
     })),
    },
  });
  // console.log("Students Enrolled in Tutor's Courses:", students);

  // Fetch mentorship sessions for the tutor
  const mentorships = await db.mentorship.findMany({
    where: {
      mentorId: tutor.id,
    },
    include: {
      mentee: true,
    },
  });

  const totalMentorships = mentorships.length;
  const completedMentorships = mentorships.filter(m => m.completed).length;
  const upcomingMentorships = mentorships.filter(m => !m.completed && m.scheduledAt > new Date()).length;

  // Fetch student progress and assignment data
  const studentAnalytics = await Promise.all(
    students.map(async (student) => {
      const studentCourses = student.courses?.split("---") || [];
      const relevantCourses = studentCourses.filter(courseId => tutorCourses.includes(courseId));

      const courseProgress = await Promise.all(
        relevantCourses.map(async (courseId) => {
          const course = courses.find(c => c.id === courseId);
          const progress = await getProgressByStudentAndCourse(student.id, courseId);
          const submissions = await getSubmissionsByStudentAndCourse(student.id, courseId);
          const totalLessons = await getTotalLessonsByCourse(courseId);

          const completedLessons = progress.filter(p => p.completed).length;
          const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

          const totalAssignments = await db.project.count({ where: { courseId } });
          const submittedAssignments = submissions.length;
          const averageGrade = submissions.length > 0
            ? submissions.reduce((acc, sub) => acc + (parseFloat(sub.grade || "0") || 0), 0) / submissions.length
            : 0;

          return {
            courseId,
            courseTitle: course?.title.split("-").join(" "),
            completionPercentage,
            totalLessons,
            completedLessons,
            totalAssignments,
            submittedAssignments,
            averageGrade,
          };
        })
      );

      const studentMentorships = mentorships.filter(m => m.menteeId === student.id);
      const completedStudentMentorships = studentMentorships.filter(m => m.completed).length;
      const upcomingStudentMentorships = studentMentorships.filter(m => !m.completed && m.scheduledAt > new Date()).length;

      return {
        studentId: student.id,
        studentName: student.name,
        courses: courseProgress,
        totalMentorships: completedStudentMentorships + upcomingStudentMentorships,
        completedMentorships: completedStudentMentorships,
        upcomingMentorships: upcomingStudentMentorships,
      };
    })
  );

  // Calculate overview metrics
  const totalStudents = students.length;
  const averageAssignmentGrade = studentAnalytics.length > 0
    ? studentAnalytics.reduce((acc, student) => {
        const studentGrades = student.courses.reduce((sum, course) => sum + (course.averageGrade || 0), 0);
        return acc + (student.courses.length > 0 ? studentGrades / student.courses.length : 0);
      }, 0) / studentAnalytics.length
    : 0;

  // Get recent mentorship sessions (last 5)
  const recentMentorships = mentorships
    .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime())
    .slice(0, 5);

  // Get recent assignment submissions (last 5)
  const recentSubmissions = await db.projectSubmission.findMany({
    where: {
      project:{
        courseId: { in: tutorCourses },
      }
    },
    include: {
      user: true,
      project: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
    take: 5,
  });
  // console.log("Recent Submissions:", recentSubmissions);


  return (
    <TutorDashboard 
      tutor={tutor} 
      courses={courses} 
      earnings={earningsData}  
      reviews={totalReviews} 
      enrollments={enrollmentsData} 
      totalEarnings={totalEarnings}
      reviewsArray={reviewsArray}
      curriculumStatus={curriculumStatus}
      totalStudents={totalStudents}
      totalMentorships={totalMentorships}
      completedMentorships={completedMentorships}
      upcomingMentorships={upcomingMentorships}
      averageAssignmentGrade={averageAssignmentGrade}
      studentAnalytics={studentAnalytics}
      recentMentorships={recentMentorships}
      recentSubmissions={recentSubmissions}
    />
  );
}