import Link from 'next/link';
import { Button } from '../ui/button';
import MaxWidthWrapper from './max-width-wrapper';
import MobileMenu from './mobile-menu';
import Image from 'next/image';

export default function NavBar() {
	return (
		<div className='bg-primary text-background'>
			<MaxWidthWrapper>
				<nav className='min-h-20 flex justify-between items-center'>
					<div className='flex justify-left items-center gap-12'>
						<Link href='/'>
							<Image
							width={150}
							height={150}
							alt='PalmtechNIQ'
							src='/assets/palmtechniqlogo.png'
							className='w-full h-full'
							/>
						</Link>
						<div className='hidden lg:flex gap-8'>
							<div>
								<Link
									href='/'
									className=' font-bold text-[15px]'
								>
									Home
								</Link>
							</div>
							
							<div>
								<Link
									href='/about'
									className=' font-bold text-[15px]'
								>
									About
								</Link>
							</div>
							<div>
							<Link
									href='/courses'
									className=' font-bold text-[15px]'
								>
									Courses
								</Link>
							
							</div>
							<div>
								<Link
									href='/contact'
									className=' font-bold text-[15px]'
								>
									Contact
								</Link>
							</div>
						</div>
					</div>
					<Link href='https://wa.me/+2348163453826'>
					<Button  variant='outline' className='rounded-full h-12 hidden hover:text-primary hover:bg-none bg-background text-primary  lg:flex'>
						
						Speak to admissions
						
					</Button>
					</Link>
					<MobileMenu />
				</nav>
			</MaxWidthWrapper>
		</div>
	);
}
