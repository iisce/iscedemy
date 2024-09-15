'use client';
import { formatToNaira } from '@/lib/utils';
import { Course, User } from '@prisma/client';
import React, { useState, useTransition } from 'react';
import { Button } from '../../ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TYPE } from '@/lib/consts';
import { PurchaseCourseSchema } from '@/schemas';
import { initiatePayment } from '@/actions/initialize-payment';
import { useRouter } from 'next/navigation';

export default function PurchaseCourseForm({
	course,
	student,
}: {
	course: Course;
	student: User;
}) {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof PurchaseCourseSchema>>({
		resolver: zodResolver(PurchaseCourseSchema),
		defaultValues: {
			courseId: course.id,
			userId: student.id,
		},
		mode: 'onChange',
	});

	const onSubmit = (values: z.infer<typeof PurchaseCourseSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			initiatePayment(values)
				.then((data) => {
					if (data?.error) {
						setError(data.error);
						return;
					} else if (data.success) {
						setTimeout(() => {
							router.push(data.authorization_url);
						}, 2000);
						form.reset();
					}
				})
				.catch((error) => {
					console.error(
						'Error occured while submitting your form. Please try again!',
						error
					);
				});
			console.log(values);
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h1 className='capitalize text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
					{course.title.split('-').join(' ')}
				</h1>
				<p className='text-gray-600 dark:text-gray-400 mb-8'>
					{course.description}
				</p>
				<div className='flex flex-col gap-3'>
					{form.getValues('type') && (
						<div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
							{formatToNaira(
								form.getValues('type') === 'Virtual'
									? 30000
									: 50000
							)}
						</div>
					)}
					<FormField
						name='type'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='px-3 font-semibold'>
									{`Which are you registering for?..`}
								</FormLabel>

								<Select
									disabled={isPending}
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='We want to know where you belong' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{TYPE.map((type, i) => (
											<SelectItem
												key={i}
												value={type.name}>
												{type.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={isPending}
						type='submit'>
						Pay Now
					</Button>
				</div>
			</form>
		</Form>
	);
}
