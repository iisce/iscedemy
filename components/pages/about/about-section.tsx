'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { motion } from 'framer-motion';


export default function AboutSection() {
	return (
		<MaxWidthWrapper>
			<motion.div
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: "1", delay: 0.3 }}
			className='w-full grid lg:grid-cols-2'>
				<div className='grid py-10 col-span-2 lg:col-span-1 place-items-center'>
					<div className=''>
						<h3 className='lg:text-[50px] text-[30px] font-bold '>
							<span className=' font-normal'>❝</span>
							Creativity is INTELLIGENCE having fun.
							<span className='font-normal'>❞</span>
						</h3>
						<i>-Albert Einstein.</i>
						<br />
						<Link href='/register'>
							<Button className='mt-[10px]'>
								Apply now
								<ArrowRight className='w-5 h-4 ' />
							</Button>
						</Link>
					</div>
				</div>
				<div className='hidden lg:col-span-1 lg:inline '>
					<Image
						className=' mt-[26.5px] '
						src='/right.png'
						height='1000'
						width='1000'			
						alt='PalmTechnIQ'
					/>
				</div>
			</motion.div>
		</MaxWidthWrapper>
	);
}
