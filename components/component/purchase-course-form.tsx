'use client';
import { formatToNaira } from '@/lib/utils';
import { Course, User } from '@prisma/client';
import React, { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TYPE } from '@/lib/consts';
import { PurchaseCourseSchema } from '@/schemas';

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
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof PurchaseCourseSchema>>({
		resolver: zodResolver(PurchaseCourseSchema),
		defaultValues: {
			name: student.name ?? '',
			email: student.email ?? '',
			course: course.id,
		},
		mode: 'onChange',
	});

	const onSubmit = (values: z.infer<typeof PurchaseCourseSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			// CrashCourse(values)
			// 	.then((data) => {
			// 		setError(data.error);
			// 		setSuccess(data.success);

			// 		if (data.success) {
			// 			setTimeout(() => {
			// 				router.push('/');
			// 			}, 6000);
			// 			form.reset();
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		console.error(
			// 			'Error occured while submitting your form. Please try again!',
			// 			error
			// 		);
			// 	});
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
						type='submit'
						className='inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
						Pay Now
					</Button>
				</div>
			</form>
		</Form>
	);
}
