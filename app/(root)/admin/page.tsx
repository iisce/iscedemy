import { auth } from "@/auth";
import AdminDashboard from "@/components/pages/dashboard/admin-dashbaord";
import { getTotalEarnings, getTotalCourses, getTotalRegistrations, getTotalTutors, getTutorCourses, getStudentsPerTutor } from "@/data/admin";
import { getTotalUsersExcludingTutors } from "@/data/user";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Fetching data
  const totalEarnings = await getTotalEarnings();
  const totalCourses = await getTotalCourses();
  const totalRegistrations = await getTotalRegistrations();
  const totalTutors = await getTotalTutors();
  const tutorCourses = await getTutorCourses();
  const studentsPerTutor = await getStudentsPerTutor();
  const totalUsersExcludingTutors = await getTotalUsersExcludingTutors(); 

  // Formatting data for the dashboard
  const data = {
    coursesRevenue: {
      totalAmountPerCourse: Math.ceil(totalEarnings / totalCourses),
      netTotalAmount: totalEarnings,
    },
    courses: {
      totalCourses,
      totalRegistrationsPerCourse: Math.ceil(totalRegistrations / totalCourses),
      netTotalRegistrations: totalRegistrations,
    },
    tutors: {
      numberOfTutors: totalTutors,
      numberOfTutorCourses: tutorCourses,
      numberOfStudentsPerTutor: Math.ceil(studentsPerTutor),
    },
    users: {
      thetotalUsersExcludingTutors: totalUsersExcludingTutors,
    },
  };

  return (
    <AdminDashboard data={data} />
  );
}
