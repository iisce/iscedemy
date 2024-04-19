
import { Progress } from "@/components/ui/progress"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import * as Icons from '@/lib/icons'
import { Separator } from "../ui/separator"

export function SingleTutorReviews() {
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
          <div className="text-sm text-gray-500">3 ratings</div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 gap-3 flex flex-row">
              5 <Icons.StarIcon />
            </div>
            <Progress className="w-[250px] bg-orange-400 mx-2" value={100} />
            <div>3</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 gap-3 flex flex-row">
              4 <Icons.StarIcon />
            </div>
            <Progress className="w-[250px] mx-2" value={0} />
            <div>0</div>
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
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="mt-4 ">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage alt="Steve Martin" src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <div className="text-lg font-semibold">Steve Martin</div>
              <div className="flex text-yellow-400">
                <Icons.StarIcon />
                <Icons.StarIcon />
                <Icons.StarIcon />
                <Icons.StarIcon />
                <Icons.StarIcon />
              </div>
              <div className="text-gray-600">Excellent Course</div>
              <p className="text-gray-500 mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
              <Separator className="w-full"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


