import LoginForm from '@/components/auth/login-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login To Your Account',
  metadataBase: new URL('https://www.palmtechniq.com/login'),
  alternates:{
    canonical: '/login',
    languages: {
      'en-US':'/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Login',
    description: 'Login To Your Account',
    url: 'https://www.palmtechniq.com/login',
    siteName: 'PalmTechnIQ',
  },
}

export default function Login() {
  return (
    <div>
        <MaxWidthWrapper className='grid mx-auto gap-5 my-4  items-center justify-center'>
            <LoginForm/>
        </MaxWidthWrapper>
    </div>
  )
}
