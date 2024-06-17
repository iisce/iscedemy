import { db } from '@/lib/db';

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
