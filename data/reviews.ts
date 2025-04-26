import { db } from '@/lib/db';

export const revalidate = 0;

export async function getAllReviews(courseId?: string) {
	try {
		const reviews = await db.review.findMany({
			where: courseId ? {courseId} : undefined,
			orderBy: { createdAt: 'desc' },
		});

		return reviews;
	} catch (error) {
		return null;
	}
}

export async function getAllReviewsByTutorName(tutorName?: string, courseId?: string) {
	if (!tutorName) {
		return null;
	}
	try {
		const reviews = await db.review.findMany({
			where: { tutorName: tutorName,
				courseId: courseId ? courseId : undefined,
			 },
			orderBy: { createdAt: 'desc' },
		});

		return reviews;
	} catch (error) {
		return null;
	}
}
export async function getAllReviewsByUserId(userId?: string, courseId?: string) {
	if (!userId) {
		return null;
	}
	try {
		const reviews = await db.review.findMany({
			where: { userId: userId,
				courseId: courseId ? courseId : undefined,
			 },
			orderBy: { createdAt: 'desc' },
		});

		return reviews;
	} catch (error) {
		return null;
	}
}
