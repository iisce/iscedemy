'use server';

export const createTransaction = async (opts: { payload: any }) => {
	try {
		const response = await fetch(
			'https://api.paystack.co/transaction/initialize',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY_TEST}`, // Replace with your Paystack secret key
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(opts.payload),
			}
		);

		const paymentResponse = await response.json();

		// Redirect user to payment page
		const data = paymentResponse.data;

		// Handle successful payment response
		return { success: 'Redirecting to payment page', data };
	} catch (error) {
		console.error('Error processing payment:', error);

		return { error: 'An error occurred while processing the payment.' };
	}
};
