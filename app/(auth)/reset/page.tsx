import Resetorm from '@/components/auth/reset-form'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Reset',
  description: 'Reset Password',
  metadataBase: new URL('https://www.palmtechniq.com/reset'),
  alternates:{
    canonical: '/reset',
    languages: {
      'en-US':'/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Reset',
    description: 'Reset Password',
    url: 'https://www.palmtechniq.com/reset',
    siteName: 'PalmTechnIQ',
  },
}

export default function ResetPage() {
  return (
    <div> 
        <MaxWidthWrapper className='grid mx-auto gap-5 mt-20   items-center justify-center'>
        <Resetorm/>
        </MaxWidthWrapper>
    </div>
  )
}
