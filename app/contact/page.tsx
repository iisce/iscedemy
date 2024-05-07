import Form from '@/components/contact/form';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import React from 'react';

export default function ContactPage() {
	return (
		<div>
			<MaxWidthWrapper className=''>
				<div className="">
					<Form />
				</div>
			</MaxWidthWrapper>
		</div>
	);
}

