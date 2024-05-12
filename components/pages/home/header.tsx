import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import * as Icons from '../../../lib/icons'
import MaxWidthWrapper from '../../layout/max-width-wrapper'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomeHeader() {
  return (
    <div className="my-10 py-10 text-primary w-full items-center justify-center mx-auto">
      <MaxWidthWrapper className='flex md:flex-row flex-col lg:flex-row'>
        <div className="flex flex-col justify-center mx-auto md:items-start md:justify-start  md:w-1/2 xl:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{`PalmTechnIQ`}</h1>
          <h1 className="xl:text-5xl md:text-3xl md:text-wrap text-xl font-bold mb-6">
            {`Learn to code. 
            Build a portfolio. 
            Get hired.`}
          </h1>

          <Link href="/register">
            <Button className="bg-primary text-background px-8 py-4 rounded-full hover:bg-green-600 xl:text-xl md:text-xl text-lg hover:text-white transition duration-300">
              {`Get OnBoard`}
            </Button>
          </Link>

			
        </div>

        <div className="xl:w-1/2 md:w-1/2 flex md:space-x-2 justify-center py-3">
          <div className="relative rounded-lg ">
            
            <Image
              alt="Person coding"
              className="rounded-lg "
              height="450"
              src="/images/careerpath1.jpg"
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="450"
            />  
            <div className="backdrop-blur-sm absolute top-0 h-full w-full">
            </div>       
            <div className="lg:absolute bottom-0 hidden -left-2 right-0 gap-3 py-2 px-3 rounded-b-lg xl:flex flex-wrap justify-center items-center lg:ml-4 lg:mb-4">
              <Badge variant="secondary" className=' cursor-pointer text-lg ' >{`HTML`}<div className=' ml-2 bg-tertiary rounded-lg py-3 px-4'><Icons.HtmlIcon /></div></Badge>
              <Badge variant="secondary"  className='cursor-pointer text-lg p-2'>{`JavaScript`}<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'><Icons.JavaScriptIcon/></div></Badge>
              <Badge variant="secondary"  className=' cursor-pointer text-lg p-2'>{`SQL`}<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'><Icons.SqlIcon/></div></Badge>
              <Badge variant="secondary"  className='cursor-pointer text-lg p-2'>{`Next.js`}<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'><Icons.NextJSIcon/></div></Badge>
              <Badge variant="secondary"  className=' cursor-pointer text-lg p-2'>{`Node.js`}<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'><Icons.NodeJSIcon/></div></Badge>
              <Badge variant="secondary"  className='cursor-pointer text-lg p-2'>{`React`}<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'><Icons.ReactJSIcon/></div></Badge>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
