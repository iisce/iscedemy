'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OurTeam() {
	return (
		<motion.div
		initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
			id='our-team'
			className='min-h-fit pt-16 border-b'
		>
			<h2 className='text-2xl font-bold pb-10'>{`Our team`}</h2>
			<div className='grid mb:mb-0  mb-8 md:grid-cols-2 grid-cols-1 gap-10 items-center justify-center mx-auto w-full'>
				<div className='w-full h-full rounded-xl overflow-clip'>
					<Image
						src='/christina.jpg'
						width={400}
						height={400}
						alt='PalmTechnIQ'
						className='w-full object-cover'
					/>
				</div>
				<div className='md:text-xl text-sm text-wrap grid font-normal md:gap-4 space-y-2 '>
					<p className=''>{`At PalmtechnIQ, we are proud of our team of qualified instructors who bring their expertise and practical experience to the classroom. Our teaching approach involves hands-on projects that help students grasp and apply the concepts they learn. This method ensures that our students gain a thorough understanding and are prepared for real-life applications.`}</p>
				</div>
			</div>
		</motion.div>
	);
}
