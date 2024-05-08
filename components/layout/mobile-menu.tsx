'use client';
import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<MenuIcon
				onClick={() => setIsOpen(true)}
				className='lg:hidden' />

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
								alt='PalmtechNIQ'
								src='/assets/palmtechniqlogo.png'
								className='w-full py-3 h-full'
							/>
						</Link>
						<div>
							<Link
								href='/'
								className=' font-bold text-[15px]'
							>
								Home
							</Link>
						</div>
						<div>
							<Link href='/about'
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
				<XIcon
					className='absolute top-10 right-8'
					onClick={() => setIsOpen(false)}
				/>
			</div>
		</>
	);
}