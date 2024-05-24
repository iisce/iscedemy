import CrashCourseRegisterForm from './course-registerpage';

export default function CourseRegisterPage() {
	return (
		<div className='flex h-full w-full flex-col dark:bg-gray-950'>
			<main className='flex-1'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='mx-auto max-w-2xl space-y-6'>
						<div className='space-y-2 text-center'>
							<h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>{`Register for a Course`}</h1>
							<p className='text-gray-700 dark:text-gray-700'>
								{`Fill out the form below to enroll in your desired course.`}
							</p>
						</div>
						<div>
							<CrashCourseRegisterForm />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
