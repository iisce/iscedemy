import { getAllTutors } from "@/actions/tutor";
import { TutorCard } from "@/components/pages/courses/admin-tutorcard";

export default async function TutorPage() {
  const tutors = await getAllTutors();

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