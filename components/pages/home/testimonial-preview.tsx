import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { Card } from '@/components/ui/card';
import { TESTIMONIALS } from '@/lib/consts';
import Image from 'next/image';

export function TestimonialPreview() {
	return (
		<div className='w-full mx-auto py-6 xl:py-12'>
			<MaxWidthWrapper>
				<h2 className='text-center text-primary xl:text-3xl text-xl  font-semibold mb-8'>
					{`Join 20+ Million learners & start a career you'll love`}
				</h2>
				<div className='xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid mx-auto items-center justify-center gap-4'>
					{TESTIMONIALS.map((testimonial, i) => (
						<Card
							key={i}
							className='bg-white p-6 rounded-lg shadow-md w-full'
						>
							{testimonial.image && (
								<div className='h-[50px] w-[50px]'>
									<Image
										width={50}
										height={50}
										src={testimonial.image}
										alt='PalmTechnIQ'
										className='object-cover rounded-full'
									/>
								</div>
							)}
							<p className='text-lg font-semibold mt-4 mb-2'>
								{testimonial.name}
							</p>
							<p className='text-gray-700 italic mb-4'>
								{testimonial.review}
							</p>
							<p className='text-sm font-medium text-gray-700'>
								{testimonial.userrole}
							</p>
						</Card>
					))}
				</div>
			</MaxWidthWrapper>
		</div>
	);
}
