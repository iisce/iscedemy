'use client';
import { verifyPayment } from '@/actions/verify-payment';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function VerificationPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const reference = searchParams.get('reference');
	const router = useRouter();

	useEffect(() => {
		const verify = async () => {
			if (reference) {
				try {
					const result = await verifyPayment(reference);
					console.log({ result });
					if (result.success) {
						setSuccess(true);
						setTimeout(() => {
							router.push('/student');
						}, 2000);
					} else {
						setError(
							result.error ?? 'Please try again later'
						);
					}
				} catch (error) {
					console.log(error);
					setError(
						'An unexpected error occurred while verifying your payment. Please try again.'
					);
				} finally {
					setIsLoading(false);
				}
			}
		};
		verify();
	}, [reference, router]);

	if (isLoading) {
		return (
			<div className='mx-auto flex h-[50svh] flex-col items-center justify-center w-full'>
				Verifying payment
				<div className='flex py-4'>
					<BeatLoader />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='mx-auto grid h-[50svh]   py-6 place-items-center w-full'>
				<FormError message={error} />
			</div>
		);
	}

	if (success) {
		return (
			<div className='mx-auto grid h-[50svh]  py-6 items-center justify-center w-full'>
				<FormSuccess message='Payment successful!' />
			</div>
		);
	}

	return null;
}
