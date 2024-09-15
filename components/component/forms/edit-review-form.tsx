'use client';

import { updateReview } from '@/actions/reviews';
import { UpdateReviewSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Review } from '@prisma/client';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import FormError from '../../form-error';
import FormSuccess from '../../form-success';
import { Button } from '../../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import StarRating from '../../ui/star-rating';
import { Textarea } from '../../ui/textarea';

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

		startTransition(() => {
			updateReview({
				description: values.description,
				rating: rating,
				title: values.title,
				id: values.id,
			})
				.then((data) => {
					if (data?.error) {
						setError(data?.error);
					} else {
						form.reset();
						setSuccess('Successful');
						toast.success('Review updated successfully');
						setIsEditing(false);
					}
				})
				.catch(() => setError('Something went wrong!!!'));
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'>
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
						type='submit'>
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
