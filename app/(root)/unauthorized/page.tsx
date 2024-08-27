import React from 'react'
import FormError from '@/components/form-error'
import { FaceFrownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Metadata } from 'next'




export const metadata: Metadata = {
	title: {
        absolute: 'Access Denied',
    },
	metadataBase: new URL('https://www.palmtechniq.com/unathorized'),
	alternates:{
	  canonical: '/unauthorized',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: 'Access Denied',
	  url: 'https://www.palmtechniq.com/unauthorized',
	  siteName: 'PalmTechnIQ',
	  images: '/innovation.jpg'
	}
  }

export default function Unauthorized() {
  return (
    <div className="mx-auto text-center my-auto  min-h-[100dvh]  grid items-center justify-center">
      
      <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-center">Opps! - Access Unauthorized</h1>
      
      <FaceFrownIcon className="mx-auto h-24 w-24 text-destructive/60" />
        <FormError message='You do not have permission to access this page.'/>
      
      <div className="mt-6 grid justify-center items-center text-center">
                         <Link
                              href="/courses"
                              className="inline-flex items-center  hover:text-white rounded-full bg-destructive/15  px-4 py-2 text-sm font-medium text-destructive shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                              prefetch={false}
                         >
                              Gain Access
                         </Link>
                    </div>
    </div>
    </div>
  )
}
