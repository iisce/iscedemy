import SignUpForm from '@/components/auth/register-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import React from 'react'

export default function Auth() {
	return (
		<div> 
      <MaxWidthWrapper className='grid mx-auto gap-5 my-4  items-center justify-center '>
        <SignUpForm/>
      </MaxWidthWrapper>

    </div>
	)
}
