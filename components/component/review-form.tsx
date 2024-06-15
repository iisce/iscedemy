'use client';

import { createReview } from '@/actions/reviews';
import { ReviewSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FormError from '../form-error';
import FormSuccess from '../form-success';
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

interface ReviewFormProps {
	tutorName: string;
	reviewerId: string;
	reviewerName: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
	tutorName,
	reviewerId,
	reviewerName,
}) => {
	const router = useRouter();
	const [rating, setRating] = useState(5);

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ReviewSchema>>({
		resolver: zodResolver(ReviewSchema),
		defaultValues: {
			tutorName,
			rating,
			reviewerId,
			reviewerName,
			description: '',
			title: '',
		},
	});

	const onSubmit = (values: z.infer<typeof ReviewSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			createReview({
				description: values.description,
				rating: rating,
				title: values.title,
				reviewerId: values.reviewerId,
				reviewerName: values.reviewerName,
				tutorName: values.tutorName,
			})
				.then((data) => {
					if (data?.error) {
						setError(data?.error);
					} else {
						form.reset();
						setSuccess('Review submitted successfully ');
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
					setRating={handleRatingChange}
				/>
				<FormError message={error} />
				<FormSuccess message={success} />
				<FormField
					control={form.control}
					name='reviewerName'
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Two Factor Code</FormLabel> */}
							<FormControl>
								<Input
									{...field}
									placeholder='Your Name (Optional)'
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
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

				<Button
					disabled={isPending}
					type='submit'>
					{isPending ? (
						<LoaderIcon className='animate-spin' />
					) : (
						'Submit Review'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ReviewForm;
