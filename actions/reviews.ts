'use server';

import { db } from '@/lib/db';
import { ReviewSchema, UpdateReviewSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';

export const createReview = async (values: z.infer<typeof ReviewSchema>) => {
	const validatedFields = ReviewSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: validatedFields.error.errors[0].message };
	}

	const { description, rating, reviewerId, courseId, reviewerName, title, tutorName } =
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
				courseId,
			},
		});

		if (!newReview) {
			return { error: 'something went wrong' };
		}

		// Handle successful payment response
		return revalidatePath(`/courses/${title}`);
	} catch (error) {
		console.error(error);

		return { error: "Failed to create review. Please try again." };
	}
};
export async function updateReview(values: z.infer<typeof UpdateReviewSchema>) {
	try {
	  const validatedData = UpdateReviewSchema.safeParse(values);
  
	  const existingReview = await db.review.findUnique({
		where: { id: validatedData.data?.id },
	  });
  
	  if (!existingReview) {
		return { error: "Review not found." };
	  }
  
	  const updatedReview = await db.review.update({
		where: { id: validatedData.data?.id },
		data: {
		  title: validatedData.data?.title || existingReview.title,
		  description: validatedData.data?.description || existingReview.description,
		  rating: validatedData.data?.rating || existingReview.rating,
		},
	  });
  
	  return { success: "Review updated successfully", review: updatedReview };
	} catch (error) {
	  console.error("Error updating review:", error);
	  return { error: "Failed to update review. Please try again." };
	}
  }

export const getReviewsForTutor = async (tutorId: string) => {
	try {
	  const reviews = await db.review.findMany({
		where: { id: tutorId },
		orderBy: { createdAt: 'desc' },
	  });
	  return reviews ?? [];
	} catch (error) {
	  console.error(error);
	  return [];
	}
  };
