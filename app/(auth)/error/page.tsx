import ErrorCard from "@/components/auth/error-card";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Error',
    description: 'Error occured',
    metadataBase: new URL('https://www.palmtechniq.com/error'),
    alternates:{
      canonical: '/error',
      languages: {
        'en-US':'/en-US',
        'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: 'Error',
      description: 'Error occured',
      url: 'https://www.palmtechniq.com/error',
      siteName: 'PalmTechnIQ',
    },
  }

const AuthErrorPage = () => {
    return(
        <MaxWidthWrapper className='grid mx-auto gap-5 mt-20  items-center justify-center'>
        <ErrorCard/>
        </MaxWidthWrapper>
    )
}
export default AuthErrorPage;