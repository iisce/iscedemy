import React from 'react';
import { ArrowRightIcon } from '../../../lib/icons';
import { ICOURSELIST2 } from '../../../lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock, Tag } from 'lucide-react';

export default function CourseList({
	icon,
	image,
	title,
	content,
	programType,
	duration,
	virtualPrice,
}: ICOURSELIST2 & {programType: string, duration: string, virtualPrice: number }) {

	const level = programType === 'CRASH_COURSE' ? 'Beginner' : programType === 'THREE_MONTHS' ? 'Intermediate' : 'Advanced';
	return (
		<div className='p-[10px] rounded-md group shadow-md border'>
			<Link
				className=''
				// <Link href={`/courses/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}>
				href={`/courses/${encodeURIComponent(
					title.toLowerCase().replace(/\s+/g, '-')
				)}`}>
				<div className='flex items-center mb-3 w-5 h-5 space-x-2 text-green-600'>
					<div className='h-5 w-5'>{icon}</div>
				</div>
				<div className='relative'>
					<Image
						className=' rounded-md'
						width='1000'
						height='1000'
						alt='PalmTechnIQ'
						src={image}
					/>
					<div className=' w-full absolute top-0 rounded-md bg-[#0000009e] group-hover:opacity-100 transition duration-300 ease-in-out opacity-0 h-full '>
						<div className='after:bg-white after:absolute after:bottom-0 after:w-[20px] group-hover:after:w-[120px] pb-1 transition duration-300 translate-y-0 after:h-[2.5px] after:rounded-full flex gap-2 justify-center items-center'>
							<p className='text-white text-center items-center mt-[80px]'>
								Get Course
							</p>
							<div className='mt-[80px]'>
								{<ArrowRightIcon />}
							</div>
						</div>
					</div>
				</div>
				<div className='text-center'>
					<p className='mt-[10px] font-bold capitalize'>
						{title}
					</p>
					<p className='text-[13px] mt-[7px] line-clamp-4 '>{content}</p>
					<div className="mt-4 flex flex-wrap gap-3">
            {/* Level */}
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Level:</span>
              <span className="text-sm text-gray-800 font-medium">{level}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Duration:</span>
              <span className="text-sm text-gray-800 font-medium">{duration}</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Price:</span>
              <span className="text-sm text-gray-800 font-medium">₦{virtualPrice.toLocaleString()}</span>
            </div>
          </div>
				</div>
			</Link>
		</div>
	);
}
