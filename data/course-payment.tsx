import { db } from '@/lib/db';
import { formatDate } from 'date-fns';

export const revalidate = 0;

export async function getCoursePaymentById(id: string) {
	try {
		const course = await db.coursePayment.findUnique({
			where: { id },
		});

		return course;
	} catch (error) {
		console.log({ error });
		return null;
	}
}

export async function getCoursePaymentByReference(transactionId: string) {
	try {
		const course = await db.coursePayment.findFirst({
			where: { transactionId },
		});

		return course;
	} catch (error) {
		console.log({ error });
		return null;
	}
}

export async function getRecentTransactions(){
	try{
		const transaction = await db.coursePayment.findMany({
			orderBy: {
				paymentDate: 'desc',
			},
			take: 6,
			include: {
				User: {
					select: {
						name: true,
					},
				},
				Course: {
					select: {
						title: true,
					},
				},
			},
		});

		return transaction.map(transaction => ({
			student: transaction.User.name || 'Unknown Student',
			email: transaction.Course.title,
			type: transaction.currency,
			status: transaction.status,
			date: formatDate(transaction.paymentDate, 'yyyy-MM-dd'),
			amount: transaction.amount
		}));
	} catch (error) {
		console.error('Error fetching transactions', error);
		return [];
	}
}
