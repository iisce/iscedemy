import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import * as Icons from '../../../lib/icons'

export default function AboutPreview() {
  return (
    <div className="w-full py-4 md:py-12npm run dev xl:py-16">
      <MaxWidthWrapper>
        <div className="xl:container xl:grid-in-container  md:px-6">
          <div className="flex flex-col text-primary   justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter xl:text-4xl underline">{`At PalmTechnIQ`}</h2>
            <div className="space-y-2 flex flex-col-reverse items-center xl:flex-row xl:justify-between w-full">
              <div className="relative w-full xl:w-1/2 xl:px-4">
                <p className="w-full text-primary text-lg text-center xl:mx-8 py-2 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {`We're dedicated to providing the best technical education for our students, preparing them for success in the digital age. Our innovative approach, experienced instructors, and hands-on learning opportunities make our institute the perfect place to launch your career in tech.`}
                </p>
              </div>
              <div className="xl:p-8 hidden xl:block xl:w-1/2 relative">
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
            
            <div className="bg-primary my-3 xl:w-[1024px] w-full mx-auto xl:gap-5 flex xl:flex-row  flex-col items-center justify-center rounded-xl py-4 px-2 text-white text-center">
		<div className="flex-col w-full items-center justify-center p-1">
  <h2 className="xl:text-2xl text-xl  font-bold mb-4">{`Stay ahead in the right field.`}</h2>
		<p className="mb-6 xl:text-xl md:text-md text-lg">{`Let's be the guide you need to perfect your greatness!`}</p>
	
		</div>
			<Link href="/about" className='xl:mr-10'>
			<Button className="bg-background text-primary px-6 py-3 rounded-full hover:bg-green-600 hover:text-white transition duration-300">
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

