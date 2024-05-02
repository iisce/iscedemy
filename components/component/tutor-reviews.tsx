
import { Progress } from "@/components/ui/progress"
import { TUTOR_REVIEWS } from "@/lib/consts"
import * as Icons from '@/lib/icons'
import Image from "next/image"
import { Separator } from "../ui/separator"

export function SingleTutorReviews({ tutorName }: {tutorName: string}) {
  const tutorReviews = TUTOR_REVIEWS.filter(
    (review) => review.tutorName === tutorName
  );

  return (
    <div className="w-full mx-auto  p-8">
      <div className="flex justify-between overflow-hidden space-x-2 gap-4 items-start">
        <div className="bg-white space-y-1 p-4 rounded-lg shadow flex flex-col items-center">
          <div className="text-3xl font-bold">5</div>
          <div className="flex text-yellow-400">
            <Icons.StarIcon />
            <Icons.StarIcon />
            <Icons.StarIcon />
            <Icons.StarIcon />
            <Icons.StarIcon />
          </div>
          <div className="text-sm text-gray-500">3
           ratings</div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 gap-3 flex flex-row">
              5 <Icons.StarIcon />
            </div>
            <Progress className="w-[250px] bg-orange-400 mx-2" value={100} />
            <div>2</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 gap-3 flex flex-row">
              4 <Icons.StarIcon />
            </div>
            <Progress className="w-[250px] mx-2" value={80} />
            <div>1</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 gap-3 flex flex-row">
              3 <Icons.StarIcon />
            </div>
            <Progress className="w-[250px] mx-2" value={0} />
            <div>0</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 gap-3 flex flex-row">
              2 <Icons.StarIcon />
            </div>
            <Progress className="w-[250px] mx-2" value={0} />
            <div>0</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 gap-3 flex flex-row">
              1 <Icons.StarIcon />
            </div>
            <Progress className="w-[250px] mx-2" value={0} />
            <div>0</div>
          </div>
        </div>
      </div>
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold underline">Reviews</h2>
        <div className="mt-4 ">
        {tutorReviews.map((review, i) => (
          <div className="flex items-center space-x-4" key={i}>        
              <Image width={40} height={40} src={review.image} alt={`PalmtechNIQ | ${tutorName}`}
                className="object-cover rounded-full" />
               <div className="flex flex-col w-full space-y-2 py-3">
               <div className="text-lg font-semibold">{review.name}</div>
               <div className="flex text-yellow-400">
                 {review.rating}
               </div>
               <div className="text-gray-600">{review.title}</div>
               <p className="text-gray-500 mt-1">
                 {review.description}
               </p>
               <Separator className="w-full"/>
             </div>       
          </div>
           ))}
        </div>
      </div>
    </div>
  )
}


