import { SignUpForm } from '@/components/component/sign-up-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import React from 'react'

export default function Auth() {
	return (
		<div> 
      <MaxWidthWrapper className='text-black grid gap-5 my-4 relative '>
        <SignUpForm/>
      </MaxWidthWrapper>

    </div>
	)
}
