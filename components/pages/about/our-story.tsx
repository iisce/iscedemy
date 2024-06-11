'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OurStory() {
	return (
		<motion.div
		initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: "1", delay: 0.3 }}
			id='our-story'
			className='min-h-fit pt-16 border-b'
		>
			<h2 className='text-2xl font-bold py-5'>{`Our Story`}</h2>
			<div className='grid mb:mb-0  mb-8 md:grid-cols-2 grid-cols-1 gap-10 items-center justify-center mx-auto w-full'>
				<div className='w-full h-full rounded-xl overflow-clip'>
					<Image
						src='/jopwe.jpg'
						width={400}
						height={400}
						alt='arin'
						className='w-full h-96 object-cover'
					/>
				</div>
				<div className='md:text-xl text-sm text-wrap  w-full grid font-normal md:gap-4 space-y-2 '>
					<span>{`PalmtechnIQ, a project by ISCE Digital Concept, is dedicated to providing high-quality digital skills training for teens and adults. Our goal is to help individuals improve their job prospects and achieve their personal and professional goals. We focus on offering top-notch education that meets industry standards, ensuring our students are well-equipped to succeed in today's digital world.`}</span>
					
				</div>
			</div>
		</motion.div>
	);
}
