import NewVerificationForm from "@/components/auth/new-verfication-form";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Verification',
  description: 'Verify password',
  metadataBase: new URL('https://www.palmtechniq.com/new-verification'),
  alternates:{
    canonical: '/new-verification',
    languages: {
      'en-US':'/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Verification',
    description: 'Verify password',
    url: 'https://www.palmtechniq.com/new-verification',
    siteName: 'PalmTechnIQ',
  },
}

export default function VerificationPage() {
    return (
      <div>
          <MaxWidthWrapper className='grid mx-auto gap-5 mt-20   items-center justify-center'>
              <NewVerificationForm/>
          </MaxWidthWrapper>
      </div>
    )
  }

