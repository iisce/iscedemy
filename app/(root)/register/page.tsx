import CourseRegisterPage from '@/components/component/course-register'
import MaxWidthWrapper from '@/components/layout/max-width-wrapper'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
	title: 'Register for a course',
	description: 'Take charge of your tech career with our wide range of courses!',
	metadataBase: new URL('https://www.palmtechniq.com/register'),
	alternates:{
	  canonical: '/register',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: 'Register for course',
	  description: 'Take charge of your tech career with our wide range of courses!',
	  url: 'https://www.palmtechniq.com/register',
	  siteName: 'PalmTechnIQ',
	  images: '/innovation.jpg'
	}
  }

export default function RegisterPage() {
  return (
    <MaxWidthWrapper>
        <CourseRegisterPage/>
    </MaxWidthWrapper>
  )
}
