'use client';
import { CrashCourse } from '@/actions/crash-course';
import { COURSES, OCCUPATION, TYPE } from '@/lib/consts';
import { CourseRegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader } from 'lucide-react';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CrashCourseRegisterForm() {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof CourseRegisterSchema>>({
		resolver: zodResolver(CourseRegisterSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			expectations: '',
			type: '',
			phone:  '',
		},
		mode: 'onChange',
	});

	const onSubmit = (values: z.infer<typeof CourseRegisterSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			CrashCourse(values)
				.then((data) => {
					setError(data.error);
					setSuccess(data.success);

					if (data.success) {
						setTimeout(() => {
							router.push('/');
						}, 6000 );
						form.reset();
					}
				})
				.catch((error) => {
					console.error(
						'Error occured while submitting your form. Please try again!',
						error
					);
				});
		});
	};

	return (
		<div>
			{success ? (
				<div className='flex flex-col w-full space-y-2'>
					<Image
					src='/images/registeroverlay.png'
					width={100}
					height={100}
					alt='Registered Successfully | PalmTechnIQ'
					className=' h-full w-full  '
					/>
					<p>{success}</p>
					<FormSuccess
						message={`You should be getting an email from us soon with some instructions on what to do next.`}
					/>
				</div>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 py-4 my-4'
					>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField
								control={form.control}
								name='firstname'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='px-3 font-semibold'>
											Firstname
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder='Enter your firstname'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='lastname'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='px-3 font-semibold'>
											Lastname
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder='Enter your lastname'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='px-3 font-semibold'>
											Email
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder='Enter your email address'
												type='email'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='px-3 font-semibold'>
											Phone number
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder='Enter your phone number'
												type='phone'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='course'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='px-3 font-semibold'>
											Course
										</FormLabel>

										<Select
											disabled={isPending}
											onValueChange={
												field.onChange
											}
											defaultValue={
												field.value
											}
										>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select a course' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{COURSES.map(
													(
														course,
														i
													) => (
														<SelectGroup
															key={
																i
															}
														>
															<SelectItem
																value={
																	course.name
																}
															>
																{
																	course.name
																}
															</SelectItem>
														</SelectGroup>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='occupation'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='px-3 font-semibold'>
											{`Let's Know you`}
										</FormLabel>

										<Select
											disabled={isPending}
											onValueChange={
												field.onChange
											}
											defaultValue={
												field.value
											}
										>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Tell us a bit about yourself.' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{OCCUPATION.map(
													(
														occupant,
														i
													) => (
														<SelectGroup
															key={
																i
															}
														>
															<SelectItem
																value={
																	occupant.name
																}
															>
																{
																	occupant.name
																}
															</SelectItem>
														</SelectGroup>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
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
											onValueChange={
												field.onChange
											}
											defaultValue={
												field.value
											}
										>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='We want to know where you belong' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{TYPE.map(
													(
														type,
														i
													) => (
														<SelectGroup
															key={
																i
															}
														>
															<SelectItem
																value={
																	type.name
																}
															>
																{
																	type.name
																}
															</SelectItem>
														</SelectGroup>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='space-y-2'>
								<FormField
									control={form.control}
									name='expectations'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='px-3 font-semibold'>
												{`Expectations`}
											</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													disabled={
														isPending
													}
													className='h-32'
													placeholder='What are your expectations from this course?'
												></Textarea>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button
							type='submit'
							className='w-full rounded-full'
						>
							{isPending ? (
								<Loader className='w-6 h-6 animate-spin' />
							) : (
								'Register'
							)}
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
}
