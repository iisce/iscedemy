import SignUpForm from '@/components/auth/register-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create Account',
  metadataBase: new URL('https://www.palmtechniq.com/sign-up'),
  alternates:{
    canonical: '/sign-up',
    languages: {
      'en-US':'/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Sign Up',
    description: 'Create Account',
    url: 'https://www.palmtechniq.com/sign-up',
    siteName: 'PalmTechnIQ',
  },
}

export default function Auth() {
	return (
		<div> 
      <MaxWidthWrapper className='grid mx-auto gap-5 my-4  items-center justify-center '>
        <SignUpForm/>
      </MaxWidthWrapper>

    </div>
	)
}
