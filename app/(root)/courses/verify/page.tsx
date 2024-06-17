import { getCoursePaymentByReference } from '@/data/course-payment';
import React from 'react';

export default async function VerificationPage({
	searchParams,
}: {
	searchParams?: {
		id?: string;
		trxref?: string;
		reference?: string;
	};
}) {
	const coursePayment = await getCoursePaymentByReference(
		searchParams?.reference ?? ''
	);
	return (
		<div>
			VerificationPage
			<pre>{JSON.stringify(coursePayment, null, 2)}</pre>
		</div>
	);
}
