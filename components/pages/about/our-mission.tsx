'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OurMission() {
	return (
		<motion.div
		 initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
			id='our-mission'
			className='min-h-fit pt-16 border-b grid gap-10 pb-10'
		>
			<div className='flex flex-col-reverse md:flex-row gap-10 items-center justify-between w-full'>
				<div className='w-full h-full rounded-xl overflow-clip'>
					<Image
						src='/pixabay.jpg'
						width={400}
						height={400}
						alt='arin'
						className='h-96 w-full aspect-video object-cover'
					></Image>
				</div>
				<div className='md:text-xl text-sm text-wrap grid font-normal gap-4 '>
					<h1 className='text-2xl font-bold  '>{`Our Mission`}</h1>

					<p className=''>{`We are constantly evolving and improving by breaking down problems and solving themin the most effecient way.`}</p>
				</div>
			</div>
			<div className='grid lg:grid-cols-2 gap-10'>
				<div className='md:text-xl text-sm font-normal grid place-items-center'>
					We believe in child education because the only way to
					really change the current world for the better is by
					enabling them to paint a world of their own.
				</div>
				<div className='w-full h-full rounded-xl overflow-clip'>
					<Image
						src='/gomes.jpg'
						width={400}
						height={400}
						alt='arin'
						className='w-full h-96 aspect-video object-cover'
					></Image>
				</div>
			</div>
		</motion.div>
	);
}
