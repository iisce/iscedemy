import { db } from '@/lib/db';

export async function getAllReviews() {
	try {
		const reviews = await db.review.findMany({
			orderBy: { createdAt: 'desc' },
		});

		return reviews;
	} catch (error) {
		return null;
	}
}

export async function getAllReviewsByTutorName(tutorName?: string) {
	if (!tutorName) {
		return null;
	}
	try {
		const reviews = await db.review.findMany({
			where: { tutorName: tutorName },
			orderBy: { createdAt: 'desc' },
		});

		return reviews;
	} catch (error) {
		return null;
	}
}
export async function getAllReviewsByUserId(id?: string) {
	if (!id) {
		return null;
	}
	try {
		const reviews = await db.review.findMany({
			where: { userId: id },
			orderBy: { createdAt: 'desc' },
		});

		return reviews;
	} catch (error) {
		return null;
	}
}
