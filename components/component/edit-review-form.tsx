'use client';

import { updateReview } from '@/actions/reviews';
import { UpdateReviewSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Review } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import StarRating from '../ui/star-rating';
import { Textarea } from '../ui/textarea';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';

interface EditReviewFormProps {
	review: Review;
	setIsEditing: (isEditing: boolean) => void;
}
const EditReviewForm: React.FC<EditReviewFormProps> = ({
	review,
	setIsEditing,
}) => {
	const [rating, setRating] = useState(review.rating);
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof UpdateReviewSchema>>({
		resolver: zodResolver(UpdateReviewSchema),
		defaultValues: {
			id: review.id,
			rating,
			description: review.description,
			title: review.title,
		},
	});

	const onSubmit = (values: z.infer<typeof UpdateReviewSchema>) => {
		setError('');
		setSuccess('');
		console.log(values);

		startTransition(() => {
			updateReview(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data?.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data?.success);
						toast.success('Review updated successfully');
						setIsEditing(false);
						router.refresh();
					}
				})
				.catch(() => setError('Something went wrong!!!'));
		});
	};

	// const handleSubmit = async (e: FormEvent) => {
	// 	e.preventDefault();

	// 	const parsed = UpdateReviewSchema.safeParse({
	// 		tutorName: review.tutorName,
	// 		rating,
	// 		title: reviewTitle,
	// 		description: reviewText,
	// 	});
	// 	if (!parsed.success) {
	// 		const errors: { [key: string]: string } = {};

	// 		parsed.error.issues.forEach((issue) => {
	// 			const path = issue.path[0]; // Get the field name
	// 			if (!errors[path]) {
	// 				// Only set the error if it hasn't been set yet
	// 				errors[path] = issue.message;
	// 			}
	// 		});
	// 		setFormErrors(errors);
	// 		return;
	// 	}

	// 	setFormErrors({});

	// 	const updatedReview: Review = {
	// 		// Keep existing properties
	// 		...review,
	// 		rating: parsed.data.rating,
	// 		title: parsed.data.title,
	// 		description: parsed.data.description,
	// 	};

	// 	// Send newReview data to server-side API route
	// 	// try {
	// 	// 	const response = await fetch(`/api/reviews/${review.id}`, {
	// 	// 		method: 'PATCH',
	// 	// 		headers: { 'Content-Type': 'application/json' },
	// 	// 		body: JSON.stringify(updatedReview),
	// 	// 	});

	// 	// 	if (response.ok) {
	// 	// 		onEditReview(updatedReview);
	// 	// 		router.refresh();
	// 	// 		onCancelEdit();
	// 	// 	} else {
	// 	// 		const data = await response.json();
	// 	// 		setFormErrors(
	// 	// 			data.error ||
	// 	// 				'An error occurred while updating the review.'
	// 	// 		);
	// 	// 	}
	// 	// } catch (error) {
	// 	// 	setFormErrors({
	// 	// 		general: 'An error occurred while updating the review. Please try again.',
	// 	// 	});
	// 	// }
	// };

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<StarRating
					rating={rating}
					setRating={setRating}
				/>

				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Two Factor Code</FormLabel> */}
							<FormControl>
								<Input
									{...field}
									placeholder='Review Title'
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Two Factor Code</FormLabel> */}
							<FormControl>
								<Textarea
									{...field}
									placeholder='Write your review here...'
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormError message={error} />
				<FormSuccess message={success} />

				<div className='grid'>
					<Button
						disabled={isPending}
						type='submit'
					>
						{isPending ? (
							<LoaderIcon className='animate-spin' />
						) : (
							'Update Review'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default EditReviewForm;
