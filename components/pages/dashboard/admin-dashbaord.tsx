import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatToNaira } from "@/lib/utils";

interface CoursesRevenue {
  totalAmountPerCourse: number;
  netTotalAmount: number;
}

interface Courses {
  totalCourses: number;
  totalRegistrationsPerCourse: number;
  netTotalRegistrations: number;
}

interface Tutors {
  numberOfTutors: number;
  numberOfTutorCourses: number;
  numberOfStudentsPerTutor: number;
}
interface Users {
  thetotalUsersExcludingTutors: number;
}



interface AdminDashboardData {
  coursesRevenue: CoursesRevenue;
  courses: Courses;
  tutors: Tutors;
  users: Users;
}


interface AdminDashboardProps {
  data: AdminDashboardData;
}

export default function AdminDashboard({ data } : AdminDashboardProps) {
  return (
    <div className="grid gap-4 py-4 lg:col-span-4">
      <Card>
        <CardHeader>
          <CardTitle>Courses Revenue</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between">
            <span>Total Amount Per Course:</span>
            <span className="font-semibold">{formatToNaira(data.coursesRevenue.totalAmountPerCourse)}</span>
          </div>
          <div className="flex justify-between">
            <span>Net Total Amount:</span>
            <span className="font-semibold">{formatToNaira(data.coursesRevenue.netTotalAmount)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between">
            <span>Total Number of Courses:</span>
            <span className="font-semibold">{data.courses.totalCourses}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Registration Per Course:</span>
            <span className="font-semibold">{data.courses.totalRegistrationsPerCourse}</span>
          </div>
          <div className="flex justify-between">
            <span>Net Total Registration:</span>
            <span className="font-semibold">{data.courses.netTotalRegistrations}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Tutors</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between">
            <span>Number of Tutors:</span>
            <span className="font-semibold">{data.tutors.numberOfTutors}</span>
          </div>
          <div className="flex justify-between">
            <span>Number of Tutor Courses:</span>
            <span className="font-semibold">{data.tutors.numberOfTutorCourses}</span>
          </div>
          <div className="flex justify-between">
            <span>Number of Students Per Tutor:</span>
            <span className="font-semibold">{data.tutors.numberOfStudentsPerTutor}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between">
            <span>Total Number of Users (excluding Tutors & Admins):</span>
            <span className="font-semibold">{data.users.thetotalUsersExcludingTutors}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
