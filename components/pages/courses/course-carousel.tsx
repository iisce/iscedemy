'use client';

import React from 'react';
import { Carousel, CarouselContent } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { COURSEHEADER } from '@/lib/consts';
import CourseHeader from './courseheader';

export default function CourseCarousel({
	crashCourses,
	threeMonthCourses,
	sixMonthCourses,
}: {
	crashCourses: any[];
	threeMonthCourses: any[];
	sixMonthCourses: any[];
}) {

	
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 4000,
				}),
			]}>
			<CarouselContent>
				{COURSEHEADER.map((value, k) => (
					<CourseHeader
						key={k}
						image={value.image}
						header={value.header}
						description={value.description}
						link={value.link}
					/>
				))}
			</CarouselContent>
		</Carousel>
	);
}
