'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OurValues() {
	return (
		<motion.div
		initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
			id='our-values'
			className='min-h-fit pt-16 border-b'
		>
			<div className='grid md:grid-cols-2 gap-16 items-center mx-auto w-full justify-center'>
				<div className='grid grid-cols-2 gap-5 md:text-xl text-sm text-wrap'>
					<div className='text-2xl font-bold pt-12 col-span-2'>{`Our Values`}</div>
					<div className='col-span-2'>
						<span className=''>{`We strive to be the foundation for our students' success and empowerment. By providing a supportive and engaging learning environment, we help our students build the skills and confidence they need to thrive. Our commitment is to empower individuals to fulfill their goals and make positive contributions to their communities.`}</span>
					</div>
					
				</div>

				<div className='md:text-xl text-sm text-wrap  '>
					<div className='w-full h-full rounded-xl overflow-clip my-3'>
						<Image
							src='/innovation.jpg'
							width={400}
							height={400}
							alt='arin'
							className='w-full h-96 object-cover'
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
