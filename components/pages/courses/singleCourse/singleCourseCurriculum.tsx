import { Button } from '@/components/ui/button';
import * as Icons from '@/lib/icons';
import { Curriculum, Lesson, Module } from '@prisma/client';

interface SingleCourseCurriculumProps {
	modules: (Module & { lessons: Lesson[] })[];
}

export default function SingleCourseCurriculum({modules}: SingleCourseCurriculumProps, curriculum: Curriculum[]) {
	return (
		<div className='bg-white'>
			{modules.length > 0 ? (
				modules.map((module, i) => (
					<div className='mt-4' key={i}>
					<div className='mb-5'>
						<h3 className='text-lg leading-6 font-medium text-black'>
							{module.headingName} (Week {i + 1})
						</h3>
						<ul className='mt-2'>
							{module.lessons.map((lesson, j) => (
								<li
									className='flex items-center justify-between my-4 py-2 border-b border-gray-200'
									key={j}>
									<div className='flex items-center'>
										<div className='h-5 w-5 text-green-600'>
											<Icons.FileIcon />
										</div>
										<p className='ml-2 text-sm font-medium text-primary'>
											{lesson.title}
										</p>
										<p className='text-xs hidden md:block font-semibold text-primary'>
											{lesson.duration}
										</p>
									</div>
									{lesson.videoUrl && (
										<Button className='text-xs font-semibold hidden md:block text-green-600 hover:text-background'>
											Watch Lesson
										</Button>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
				))
			): (
			 <div className='mt-4'>
                    <p className='text-sm text-gray-500'>No modules available for this course.</p>
                </div>
		)}
			
		</div>
	);
}
