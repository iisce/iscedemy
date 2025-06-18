'use server';

import { db } from '@/lib/db';

export const createTransaction = async (opts: { payload: any }) => {
	try {
		const response = await fetch(
			'https://api.paystack.co/transaction/initialize',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(opts.payload),
			}
		);

		const paymentResponse = await response.json();
		console.log('Transaction Initialization Response:', paymentResponse);

		if (!paymentResponse?.status) {
			return {
				error: 'An error occurred while initializing the payment.',
			};
		}

		// Redirect user to payment page
		const data = paymentResponse.data;
		// Handle successful payment response
		return { success: 'Redirecting to payment page', data };
	} catch (error) {
		console.error('Error processing payment:', error);

		return { error: 'An error occurred while processing the payment.' };
	}
};

export async function verifyTransaction(transactionReference: string) {
	try {
		const response = await fetch(
			`https://api.paystack.co/transaction/verify/${transactionReference}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
				},
			}
		);
		const paymentResponse = await response.json();
		console.log('Paystack response:', paymentResponse);

		if (
			!paymentResponse?.status ||
			paymentResponse.data.status !== 'success'
		) {
			return { error: 'Transaction failed or could not be verified.' };
		}

		const transaction = await db.coursePayment.findFirst({
			where: { transactionId: transactionReference },
		});

		if (!transaction) {
			return { error: 'Transaction not found' };
		}
		return { success: 'Transaction Verified' };
	} catch (error) {
		console.error('Error verifying Paystack transaction:', error);
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: 'Error verifying transaction.' };
	}
}
