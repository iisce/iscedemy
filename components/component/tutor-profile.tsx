import { TUTOR_PROFILE } from "@/lib/consts";
import Image from "next/image";
import Link from "next/link";

interface ITutorProfileProps{
  tutorName: string;
}

export default function TutorProfile({ tutorName }: ITutorProfileProps) {
  const tutor = TUTOR_PROFILE.find(profile => profile.name === tutorName);

  if (!tutor) {
    return <div>Tutor profile not available at the moment</div>;
  }
	return (
		<div className="w-full mx-auto p-6 bg-white ">
				<div className="flex items-center">
          <div className="-translate-y-20 w-full h-full">
          <Image width={50} height={50} src={tutor.image} alt={`PalmtechNIQ | ${tutor.name}`}
            className="object-cover rounded-full" />
          </div>
           
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{tutor.name}</h1>
        <p className="text-sm text-gray-500">{tutor.role}</p>
        <p className="mt-4 text-gray-700">
          {tutor.about}
        </p>
        <Link href='/' className=" cursor-pointer">
        <div className="flex flex-row space-x-4 mt-4 text-blue-600">
          {tutor.icon}
        </div>
        </Link>
	    </div>
    </div>
</div>
	)
}

