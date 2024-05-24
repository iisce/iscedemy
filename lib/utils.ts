import { Review } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
}

export function calculateAverageRating(reviews: Review[]): number {
	if (reviews.length === 0) {
		return 0;
	}

	const totalRating = reviews.reduce(
		(sum, review) => sum + review.rating,
		0
	);

	const averageRating = totalRating / reviews.length;

	return averageRating;
}
