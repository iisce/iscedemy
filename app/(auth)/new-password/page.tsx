import NewPasswordForm from '@/components/auth/new-password-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'New Password',
  description: 'Create new password',
  metadataBase: new URL('https://www.palmtechniq.com/new-password'),
  alternates:{
    canonical: '/new-password',
    languages: {
      'en-US':'/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'New Password',
    description: 'Create new password',
    url: 'https://www.palmtechniq.com/new-password',
    siteName: 'PalmTechnIQ',
  },
}

export default function VerificationPage() {
    return (
      <div>
          <MaxWidthWrapper className='grid mx-auto gap-5 mt-20  items-center justify-center'>
          <NewPasswordForm/>
          </MaxWidthWrapper>
      </div>
    )
  }

