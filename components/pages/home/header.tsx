import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';
import Image from 'next/image';
import Link from 'next/link';
import * as Icons from '../../../lib/icons';

export default function HomeHeader() {
	const words = [
		'Learn to code?',
		'Build a portfolio?',
		'Get hired?',
		'Start a career!',
	];

	return (
		<div className='mb-10 py-10 text-primary w-full items-center justify-center mx-auto'>
			<div className='flex md:flex-row flex-col lg:flex-row'>
				<div className='flex flex-col justify-center md:mt-10 mx-auto md:items-start md:justify-start md:w-1/2'>
					<h1 className='text-3xl font-bold mb-2'>{`PalmTechnIQ`}</h1>
					<div className='xl:text-4xl md:text-2xl md:text-wrap text-xl font-bold text-neutral-900 dark:text-neutral-400'>
						Ready to
						<FlipWords words={words} /> <br />
						<h1 className='text-3xl font-bold pt-1 mb-2'>{`Kick-start your tech career today with PalmTechnIQ`}</h1>
					</div>

					<Link href='/courses'>
						<Button className='bg-primary text-background px-8 py-4 rounded-full hover:bg-green-600 xl:text-xl md:text-xl text-lg hover:text-white transition duration-300'>
							{`Get OnBoard`}
						</Button>
					</Link>
				</div>

				<div className='md:w-1/2 flex justify-center py-3'>
					<div className='relative rounded-lg '>
						<Image
							alt='Person coding'
							className='rounded-lg aspect-square object-cover'
							height='450'
							src='/images/careerpath1.jpg'
							width='450'
						/>
						<div className='backdrop-blur-sm absolute top-0 h-full w-full'></div>
						<div className='lg:absolute bottom-0 hidden -left-2 right-0 gap-3 py-2 px-3 rounded-b-lg xl:flex flex-wrap justify-center items-center lg:ml-4 lg:mb-4'>
							<Badge
								variant='secondary'
								className=' cursor-pointer text-sm p-1 '>
								{`Web Development`}
								<div className=' ml-2 bg-tertiary rounded-lg py-3 px-4'>
									<Icons.WebDevelopmentIcon />
								</div>
							</Badge>
							<Badge
								variant='secondary'
								className='cursor-pointer text-sm p-1'>
								{`Smart-home Automation`}
								<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'>
									<Icons.SmartHomeAutomationIcon />
								</div>
							</Badge>
							<Badge
								variant='secondary'
								className=' cursor-pointer text-sm p-1'>
								{`UI/UX Design`}
								<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'>
									<Icons.UIDesignIcon />
								</div>
							</Badge>
							<Badge
								variant='secondary'
								className='cursor-pointer text-sm p-1'>
								{`CyberSecurity`}
								<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'>
									<Icons.CyberSecurityIcon />
								</div>
							</Badge>
							<Badge
								variant='secondary'
								className=' cursor-pointer text-sm p-1'>
								{`Digital Marketing`}
								<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'>
									<Icons.DigitalMarketingIcon />
								</div>
							</Badge>
							<Badge
								variant='secondary'
								className='cursor-pointer text-sm p-1'>
								{`Graphic Design`}
								<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'>
									<Icons.GraphicDesignIcon />
								</div>
							</Badge>
							<Badge
								variant='secondary'
								className='cursor-pointer text-sm p-1'>
								{`App Development`}
								<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'>
									<Icons.AppDevelopmentIcon />
								</div>
							</Badge>
							<Badge
								variant='secondary'
								className='cursor-pointer text-sm p-1'>
								{`Project Management`}
								<div className='rounded-lg ml-2 bg-tertiary py-3 px-4'>
									<Icons.ProjectManagementIcon />
								</div>
							</Badge>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
