import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import * as Icons from '../../../lib/icons'

export default function AboutPreview() {
  return (
    <div className="w-full py-6 md:py-12 lg:py-16">
      <MaxWidthWrapper>
        <div className="container grid-in-container px-4 md:px-6">
          <div className="flex flex-col text-primary   justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter xl:text-4xl underline">{`At PalmTechNIQ`}</h2>
            <div className="space-y-2 flex flex-col-reverse items-center lg:flex-row lg:justify-between w-full">
              <div className="relative w-full lg:w-1/2 px-4">
                <p className="w-full text-primary text-lg text-center xl:mx-8 py-2 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {`We're dedicated to providing the best technical education for our students, preparing them for success in the digital age. Our innovative approach, experienced instructors, and hands-on learning opportunities make our institute the perfect place to launch your career in tech.`}
                </p>
              </div>
              <div className="p-8 w-full lg:w-1/2 relative">
                <video src='/images/aboutsectionvideo.mp4' width={500} height={500}  
                autoPlay loop className='rounded-xl'></video>
              </div>
            </div>

            <div className="relative mt-12 lg:mt-20">
              <div className=" relavtive mx-auto flex flex-col py-4 gap-6  lg:gap-2 lg:max-w-none items-center xl:space-x-4 justify-center xl:flex-row lg:flex-row md:flex-row">
                <div className="flex flex-col items-center ">
                  <div className="h-30 w-30 py-3">
                    <Icons.ExpertIcon />
                  </div>
                  <div className="xl:text-xl lg:text-xl text-md text-primary dark:text-gray-400">{`Expert Instructors`}</div>
                </div>
                <div className="flex flex-col items-center ">
                  <div className="h-30 w-30 py-3">
                    <Icons.Curriculum />
                  </div>
                  <div className="xl:text-xl lg:text-xl text-md text-primary dark:text-gray-400">{`Hands-on Projects`}</div>
                </div>
                <div className="flex flex-col items-center ">
                  <div className="h-30 w-30 py-3">
                    <Icons.AwardIcon />
                  </div>
                  <div className="xl:text-xl lg:text-xl text-md text-primary dark:text-gray-400">{`Cutting-edge Curriculum`}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary my-3 w-[1024px] mx-auto gap-5 flex items-center justify-center space-x-4 rounded-xl py-4 px-2 text-white text-center">
		<div className="flex-col  mr-10">
  <h2 className="text-2xl  font-bold mb-4">{`Ready to get started?`}</h2>
		<p className="mb-6 text-xl">{`Join us now and unlock your potential!`}</p>
	
		</div>
			<Link href="/about">
			<Button className="bg-background text-primary px-6 py-3 rounded-full hover:bg-tertiary hover:text-white transition duration-300">
				{`Learn More`}
			</Button>
		</Link>
	</div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

