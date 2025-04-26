import { auth } from "@/auth";
  import TutorDashboard from "@/components/pages/dashboard/tutor-dashboard";
  import { getAllReviewsByTutorName } from "@/data/reviews";
  import { getAllCoursesByTutor, getEarningsForCourse, getEnrollmentsForCourse } from "@/data/tutor";
  import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
  import { Metadata } from "next";
  import { redirect } from "next/navigation";

  export const dynamic = 'force-dynamic';

  export const metadata: Metadata = {
    title: 'Tutor Dashboard',
    description: 'Stay in-charge of your courses and keep track of your revenue!',
    metadataBase: new URL('https://www.palmtechniq.com/tutor'),
    alternates:{
      canonical: '/tutor',
      languages: {
      'en-US':'/en-US',
      'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: 'Tutor Dashboard',
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

    if(session?.user?.role !== 'TUTOR') {
      redirect('/unauthorized');
      return null;
    }

    const tutor = await getUserById(session?.user?.id ?? '');
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
      console.log(`Earnings for course ${course.id}:`, earnings);
      earningsData[course.id] = earnings;
      totalEarnings += earnings;
    }

  // Fetch whether each course has a curriculum using the API
  // Check curriculum status directly in the page
  const curriculumStatus: { [key: string]: boolean } = {};
  for (const course of courses) {
    const curriculum = await db.curriculum.findUnique({
      where: { courseId: course.id },
    });
    curriculumStatus[course.id] = !!curriculum;
  }
  
    return (
      <>
    <TutorDashboard 
    tutor={tutor} 
    courses={courses} 
    earnings={earningsData}  
    reviews={totalReviews} 
    enrollments={enrollmentsData} 
    totalEarnings={totalEarnings}
    reviewsArray={reviewsArray}
    curriculumStatus={curriculumStatus}
    />
  
    </>
    );
  }


