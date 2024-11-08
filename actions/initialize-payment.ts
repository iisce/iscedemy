// actions/paystack.ts

'use server';
import { db } from '@/lib/db';
import { PurchaseCourseSchema } from '@/schemas';
import * as z from 'zod';
import { createTransaction } from './paystack';

interface PaymentProps {
	email: string;
	amount: number;
	courseTitle: string;
}

export async function initiatePayment(
	paymentData: z.infer<typeof PurchaseCourseSchema>
) {
	const validatedFields = PurchaseCourseSchema.safeParse(paymentData);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { courseId, type, userId } = validatedFields.data;

	const course = await db.course.findUnique({
		where: { id: courseId },
	});
	if (!course) return { error: 'No course with that ID found' };

	const student = await db.user.findUnique({
		where: { id: userId },
	});
	if (!student) return { error: 'No student found' };

	let coursePrice =
		type.toLowerCase() === 'physical'
			? course.physicalPrice * 100 + 2000000
			: course.virtualPrice * 100 + 2000000;
	const reference = `course-${course.title}-${Date.now()}`;
	try {
		const newTransaction = await db.coursePayment.create({
			data: {
				userId: student.id,
				courseId: course.id,
				currency: 'NGN',
				amount: coursePrice,
				status: 'PENDING',
				transactionId: reference,
			},
		});

		const payload = {
			email: student.email,
			name: student.name,
			currency: 'NGN',
			amount: newTransaction.amount,
			reference: newTransaction.transactionId,
			callback_url: `${process.env.NEXT_PUBLIC_URL}/courses/verify?id=${newTransaction.id}`,
			metadata: {
				custom_fields: [
					{
						display_name: 'Course Title',
						variable_name: 'course_title',
						value: course.title,
					},
					{
						display_name: 'Customer Name',
						variable_name: 'customer_name',
						value: student.name,
					},
					{
						display_name: 'Customer Phone',
						variable_name: 'customer_phone',
						value: student.phone,
					},
					{
						display_name: 'Type',
						variable_name: 'course_type',
						value: type,
					},
					{
						display_name: 'Amount',
						variable_name: 'course_amount',
						value: coursePrice,
					},
					{
						display_name: 'Additional Fee Explanation',
						veriable_name: 'additional_fee_explanation',
						value: type.toLowerCase() === 'physical' || 'Virtual'
						? 'Includes additional 20,000 Naira for certificate and Digital Student ID.'
						: 'No additional charges.',
					}
				],
			},
		};
		const createTransactionResponse = await createTransaction({
			payload,
		});

		if (createTransactionResponse.error) {
			return { error: createTransactionResponse.error };
		} else {
			return {
				success: createTransactionResponse.success,
				authorization_url:
					createTransactionResponse.data.authorization_url,
			};
		}
	} catch (error) {
		console.error('Error initializing Paystack transaction:', error);
		return { error: 'something went wrong' };
	}
}
