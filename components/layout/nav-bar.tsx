'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import MaxWidthWrapper from './max-width-wrapper';
import MobileMenu from './mobile-menu';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { NAVLINKS } from '@/lib/consts';
import LogInButton from './log-in-button';
import { User } from '@prisma/client';

export default function NavBar({ user }: { user?: User | null }) {
	//this constant is useed to set a particular navlink active letting users know the page they're on.
	const [active, setActive] = useState('');
	useEffect(() => {
		const currentPathname = window.location.pathname;
		setActive(currentPathname);
	}, []);

	return (
		<div className='bg-primary text-background'>
			<MaxWidthWrapper>
				<nav className='h-20 flex justify-between items-center'>
					<div className='flex justify-left items-center gap-12'>
						<Link href='/'>
							<Image
								width={150}
								height={150}
								alt='PalmTechnIQ'
								src='/assets/palmtechniqlogo.png'
								className='w-full h-full'
							/>
						</Link>
						<div className='hidden lg:flex gap-8'>
							<ul className='flex gap-9 justify-end items-center flex-1'>
								{NAVLINKS.map((nav) => (
									<li
										key={nav.title}
										className={`font-bold text-[15px] ${
											active === nav.href
												? 'text-green-600  px-1 py-2'
												: 'text-background'
										} `}
										onClick={() =>
											setActive(nav.href)
										}>
										<Link href={`${nav.href}`}>
											{nav.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							className='rounded-full h-12 hidden hover:text-primary hover:bg-none bg-background text-primary  lg:flex'
							asChild>
							<Link href='https://wa.me/qr/GHKMMDKEJZNEF1'>
								{`Speak to admissions`}
							</Link>
						</Button>
						<LogInButton user={user} />
						<MobileMenu />
					</div>
				</nav>
			</MaxWidthWrapper>
		</div>
	);
}
