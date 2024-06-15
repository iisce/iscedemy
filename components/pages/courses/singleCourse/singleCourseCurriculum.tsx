import * as Icons from '@/lib/icons';
import { Curriculum } from '@prisma/client';

interface SingleCourseCurriculumProps {
	curriculum: {
		title: string;
		topics: {
			name: string;
			duration?: string;
			previewUrl?: string;
		}[];
	}[];
}

export default function SingleCourseCurriculum({
	curriculum,
}: {
	curriculum: Curriculum[];
}) {
	return (
		<div className='bg-white'>
			{curriculum.map((courseCurriculum, i) => (
				<div
					className='mt-4'
					key={i}>
					<div className='mb-5'>
						<h3 className='text-lg leading-6 font-medium text-black'>
							{courseCurriculum.headingName}
						</h3>
						<ul className='mt-2'>
							{courseCurriculum.headingDescription
								.split('---')
								.map((topic, i) => (
									<li
										className='flex items-center justify-between my-4 py-2 border-b border-gray-200'
										key={i}>
										<div className=' flex items-center'>
											<div className='h-5 w-5 text-green-600'>
												<Icons.FileIcon />
											</div>
											<p className='ml-2 text-sm font-medium text-primary'>
												{topic}
											</p>
											{/* <p className="text-xs hidden md:block font-semibold text-primary">{topic.duration}</p> */}
										</div>
										{/* {topic.previewUrl && (
											<Button className="text-xs font-semibold hidden md:block text-green-600 hover:text-background">{topic.previewUrl}</Button>
											)}  */}
									</li>
								))}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
}
