import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import Faq from "@/components/pages/fqa/faq";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: {
     absolute: 'Frequently Asked Questions - PalmTechnIQ',
    },
    description: 'Get answers to the most common questions about PalmtechnIQ.',
    metadataBase: new URL('https://www.palmtechniq.com/faq'),
    alternates:{
      canonical: '/faq',
      languages: {
        'en-US':'/en-US',
        'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: {
        absolute: 'Frequently Asked Questions - PalmTechnIQ',
       },
      description: 'Get answers to the most common questions about PalmtechnIQ.',
      url: 'https://www.palmtechniq.com/faq',
      siteName: 'PalmTechnIQ',
    },
}

export default function FAQPage() {
	return (
        <div className="">
            <MaxWidthWrapper>
            <Faq />
            </MaxWidthWrapper>
        </div>
    );
};