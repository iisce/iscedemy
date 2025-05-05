import { auth } from "@/auth";
import MentorshipsPage from "@/components/pages/tutor/mentorships-page";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { sessionId: string } }): Promise<Metadata> {
  const session = params.sessionId
    ? await db.mentorship.findUnique({
        where: { id: params.sessionId },
        include: { mentee: true },
      })
    : null;
  return {
    title: session && session.mentee ? `Mentorship with ${session.mentee.name} | Tutor` : 'Tutor Mentorship Details',
    description: 'View and manage details of your mentorship session on PalmTechnIQ.',
    metadataBase: new URL(`https://www.palmtechniq.com/tutor/mentorships/${params.sessionId}`),
    alternates: {
      canonical: `/tutor/mentorships/${params.sessionId}`,
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: session && session.mentee ? `Mentorship with ${session.mentee.name} | Tutor` : 'Tutor Mentorship Details',
      description: 'View and manage details of your mentorship session on PalmTechnIQ.',
      url: `https://www.palmtechniq.com/tutor/mentorships/${params.sessionId}`,
      siteName: 'PalmTechnIQ',
      images: '/mentorship.jpg',
    },
  };
}

export default async function TutorMentorshipsPage() {
  const session = await auth();
  if (!session) {
    redirect('/login'); 
  }

  if (session?.user?.role !== 'TUTOR') {
    redirect('/unauthorized');
    return null;
  }

  const tutor = await getUserById(session?.user?.id ?? '');
  if (!tutor) {
    redirect("/unauthorized");
    return null;
  }

  const mentorships = await db.mentorship.findMany({
    where: {
      mentorId: tutor.id,
    },
    include: {
      mentee: true,
    },
    orderBy: {
      scheduledAt: "desc",
    },
  });

  return (
    <MentorshipsPage
      mentorshipId={mentorships[0]?.id}
      tutor={tutor}
      mentorships={mentorships}
    />
  );
}