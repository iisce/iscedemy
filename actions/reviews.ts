'use server';

import { db } from '@/lib/db';
import { ReviewSchema, UpdateReviewSchema } from '@/schemas';
import * as z from 'zod';

export const createReview = async (values: z.infer<typeof ReviewSchema>) => {
	const validatedFields = ReviewSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: validatedFields.error.errors[0].message };
	}

	const { description, rating, reviewerId, reviewerName, title, tutorName } =
		validatedFields.data;

	try {
		const newReview = await db.review.create({
			data: {
				description,
				reviewerName,
				title,
				tutorName,
				userId: reviewerId,
				rating,
			},
		});

		if (!newReview) {
			return { error: 'something went wrong' };
		}

		// Handle successful payment response
		return { success: 'Review added successfully' };
	} catch (error) {
		console.error(error);

		return { error: 'something went wrong' };
	}
};
export const updateReview = async (
	values: z.infer<typeof UpdateReviewSchema>
) => {
	const validatedFields = UpdateReviewSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: validatedFields.error.errors[0].message };
	}

	const { description, rating, id, title } = validatedFields.data;

	try {
		const updatedReview = await db.review.update({
			where: { id },
			data: {
				description,
				rating,
				title,
			},
		});

		if (!updatedReview) {
			return { error: 'something went wrong' };
		}

		// Handle successful payment response
		return { success: 'Review added successfully' };
	} catch (error) {
		console.error(error);

		return { error: 'something went wrong' };
	}
};
