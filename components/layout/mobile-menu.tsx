'use client';
import { NAVLINKS } from '@/lib/consts';
import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function MobileMenu() {
	const [active, setActive] = useState('');
	
	const [isOpen, setIsOpen] = useState(false);

	const [toggle, setToggle] = useState(false);

	const toggleMenu = () => {
		setToggle(!toggle);
	};
	
	useEffect(() => {
		const currentPathname = window.location.pathname;
		setActive(currentPathname);
	}, []);

	return (
		<>
		
			<MenuIcon
				onClick={() => 
					{setIsOpen(true)
					toggleMenu();
				}}
				className='lg:hidden' />
				{toggle && (
			<div
				className={`fixed top-0 ${
					isOpen ? 'left-0' : 'left-[110%]'
				} w-screen h-screen  text-background backdrop-blur-md bg-slate-500 bg-opacity-50 z-50 flex items-center justify-end lg:hidden transition-all duration-500 ease-out`}
			>
			
				<div className='absolute text-background h-screen w-[80%] rounded-l-3xl bg-primary flex flex-col'>
					<div className='flex flex-col gap-8 items-center pt-2 '>
						<Link href='/'>
							<Image
								width={100}
								height={100}
								alt='PalmTechnIQ'
								src='/assets/PalmTechnIQlogo.png'
								className='w-full py-3 h-full'
								onClick={() => {
								toggleMenu();
								}}
							/>
						</Link>
						<ul className='flex flex-col gap-9 justify-center items-center flex-1'>
								{NAVLINKS.map((nav) => (
									<li key={nav.title}
									className={`font-bold text-[15px] ${active === nav.href ? 'text-green-600 px-1 py-2': 'text-background'} `}
									onClick={() => {
										setActive(nav.href);
										toggleMenu();
									}}
									>
									<Link href={`${nav.href}`}>{nav.title}</Link>
									</li>
								))}
							</ul>
					</div>
				</div>
				
				<XIcon
					className='absolute top-10 right-8'
					onClick={() => setIsOpen(false)}
				/>
				
			</div>
			)}
			
		</>
	);
}