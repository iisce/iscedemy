import { TUTOR_PROFILE } from "@/lib/consts"
import Image from "next/image"
import Link from "next/link"

export default function TutorProfile() {
	return (
		<div className="max-w-4xl mx-auto p-6 bg-white ">
			{TUTOR_PROFILE.map((tutor, i) => (
				<div className="flex items-center" key={i}>
          <div className="-translate-y-20 w-full h-full">
          <Image width={50} height={50} src={tutor.image} alt="Iscedemy | Wilhelm F." 
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
	))}
</div>
	)
}

