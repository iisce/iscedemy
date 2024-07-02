import { auth } from "@/auth";
import TutorDashboard from "@/components/pages/dashboard/tutor-dashboard";
import { getAllReviewsByTutorName } from "@/data/reviews";
import { getAllCoursesByTutor, getEarningsForCourse, getEnrollmentsForCourse } from "@/data/tutor";
import { getUserById } from "@/data/user";

export default async function TutorDashboardPage() {
  const session = await auth();
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
  console.log('Total Earnings:', totalEarnings);

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
  />
 
  </>
  );
}


