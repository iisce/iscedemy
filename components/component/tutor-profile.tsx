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
		<div className="w-full px-4 md:px-0 py-4 mx-auto justify-center items-center md:p-6 bg-white ">
				<div className="flex md:flex-row flex-col md:gap-0 gap-2 justify-center items-center">
          <div className="md:-translate-y-20  md:block w-full h-full">
          <Image width={50} height={50} src={tutor.image} alt={`PalmtechNIQ | ${tutor.name}`}
            className="object-cover rounded-full" />
          </div>
           
      <div className="flex flex-col gap-2">
        <h1 className="md:text-2xl text-xl font-semibold">{tutor.name}</h1>
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

