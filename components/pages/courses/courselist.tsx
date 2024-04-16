import { ArrowRightIcon } from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseList({
	icon,
	image,
	title,
	content,
}: ICOURSELIST) {
	return (
		<div className='p-[10px] rounded-md group shadow-md border'>
			<div className='flex items-center mb-3 w-5 h-5 space-x-2 text-tertiary'>
					{icon && icon.map((singleIcon, i) =>(
						<div className='h-5 w-5' key={i}>
							{singleIcon}
						</div>
					))}
            </div>
			<div className='relative'>
				<Image
					className=' rounded-md'
					width='1000'
					height='1000'
					alt='image'
					src={image}
				/>
				<div className=' w-full absolute top-0 rounded-md bg-[#0000009e] group-hover:opacity-100 transition duration-300 ease-in-out opacity-0 h-full '>
					<Link
						className=''
						// <Link href={`/courses/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}>
						href={`/courses/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}
					>
						<div className='after:bg-white after:absolute after:bottom-0 after:w-[20px] group-hover:after:w-[120px] pb-1 transition duration-300 translate-y-0 after:h-[2.5px] after:rounded-full flex gap-2 justify-center items-center'>
							<p className='text-white text-center items-center mt-[80px]'>
								Get Course
							</p>
							<div className='mt-[80px]'>
								{<ArrowRightIcon />}
							</div>
						</div>
					</Link>
				</div>
			</div>
			<div className='text-center'>
				<p className='mt-[10px] font-bold'>{title}</p>
				<p className='text-[13px] mt-[7px] '>{content}</p>
			</div>
		</div>
	);
}
