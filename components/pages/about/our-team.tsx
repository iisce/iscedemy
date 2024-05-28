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
						alt='arin'
						className='w-full object-cover'
					/>
				</div>
				<div className='md:text-2xl text-md text-wrap grid font-normal md:gap-4 space-y-2 '>
					<p className=''>{`We exist specifically for our customers because we know heroes such as yourselves deserve only the best sidekicks.`}</p>
				</div>
			</div>
		</motion.div>
	);
}
