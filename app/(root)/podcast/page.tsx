import PodcastDisplay from '@/components/pages/podcast/podcast'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title:{
    absolute:  'Podcast - PalmTechnIQ',
  },
  description: 'Digital Dialogues: Unpacking the Latest in Tech!',
  metadataBase: new URL('https://www.palmtechniq.com/podacast'),
  alternates:{
    canonical: '/podacast',
    languages: {
    'en-US':'/en-US',
    'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: {
    absolute: 'Podcast - PalmTechnIQ',
    },
    description: 'Digital Dialogues: Unpacking the Latest in Tech!',
    url: 'https://www.palmtechniq.com/podacast',
    siteName: 'PalmTechnIQ',
    images: '/jopwe.jpg'
  }
}

interface PodcastDisplayProps {
  searchParams: { page?: string };
}
export default function PodcastPage({searchParams}: PodcastDisplayProps) {
  return (
    <div>
        <PodcastDisplay  searchParams={searchParams}/>
    </div>
  )
}
