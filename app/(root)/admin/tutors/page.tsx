import { getAllTutors } from "@/actions/tutor";
import { auth } from "@/auth";
import { TutorCard } from "@/components/pages/courses/admin-tutorcard";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
	title: 'Tutor Dashboard - PalmTechnIQ',
	description: 'Stay in-charge of your courses and keep track of your revenue!',
	metadataBase: new URL('https://www.palmtechniq.com/admin/tutor'),
	alternates:{
	  canonical: '/tutor',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: 'Tutor Dashboard - PalmTechnIQ',
	  description: 'Stay in-charge of your courses and keep track of your revenue!',
	  url: 'https://www.palmtechniq.com/admin/tutor',
	  siteName: 'PalmTechnIQ',
	  images: '/christina.jpg'
	}
  }


export default async function TutorPage() {
	const session = await auth();
  const tutors = await getAllTutors();

  if(session?.user?.role !== 'ADMIN') {
    redirect('/unauthorized');

    return null;
  }
  return (
    <div className="min-h-screen grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 items-center justify">
      {tutors.length > 0 ? (
        tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor}/>
        ))
      ):(
        <>
        <p>No tutor avialable..</p>
        </>
      )}
    </div>
  )
}