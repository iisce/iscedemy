import { auth } from "@/auth";
import { ClientEditProfileForm } from "@/components/component/forms/update-profile-form";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/data/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Student Profile',
  description: 'Manage your profile and track your learning stats on PalmTechnIQ.',
  metadataBase: new URL('https://www.palmtechniq.com/profile'),
  alternates: {
    canonical: '/profile',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Student Profile',
    description: 'Manage your profile and track your learning stats on PalmTechnIQ.',
    url: 'https://www.palmtechniq.com/profile',
    siteName: 'PalmTechnIQ',
    images: '/innovation.jpg'
  }
}



export default async function StudentProfilePage() {
  const session = await auth();

  if (!session?.user || session?.user?.role !== 'STUDENT') {
    redirect('/login');
    return null;
  }

  const student = await getUserById(session.user.id ?? "");
  const paidCourses = student?.courses?.split("---").map(course => {
    try {
      return JSON.parse(course);
    } catch {
      return {};
    }
  }) || [];

  // Simulate learning stats (replace with actual data later)
  const totalCourses = paidCourses.length;
  const completedLessons = paidCourses.reduce((sum, data) => sum + (data?.completedLessons || 0), 0);
  const certificatesEarned = paidCourses.length > 0 ? Math.floor(paidCourses.length * 0.5) : 0;
  const hoursSpent = paidCourses.length * 5; // Example: 5 hours per course

  return (
    <MaxWidthWrapper className="py-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Profile</h1>

      {/* Profile Overview */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Name:</span>
              <span>{student?.name || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Email:</span>
              <span>{student?.email || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Role:</span>
              <span>{student?.role || "Student"}</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Learning Stats */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Learning Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-teal-500">📚</span>
                <span>Enrolled Courses: {totalCourses}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✔️</span>
                <span>Completed Courses: {completedLessons}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">⏰</span>
                <span>Hours Spent: {hoursSpent}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500">🏆</span>
                <span>Certificates Earned: {certificatesEarned}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <ClientEditProfileForm initialName={student?.name || ""} userId={student?.id || ""} />
    </MaxWidthWrapper>
  );
}

