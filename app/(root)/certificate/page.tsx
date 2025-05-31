import CertificateSearchInput from "@/components/pages/certificate/landing-input";
import { Metadata } from "next";


export const metadata: Metadata = {
	title: 'Validate Student | PalmTechnIQ',
	description: 'Confirm if its our student! Scan / Tap To verify',
	metadataBase: new URL('https://www.palmtechniq.com/certificate'),
	alternates:{
	  canonical: '/certificate',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: 'Validate Student | PalmTechnIQ',
	  description: 'Confirm if its our student! Scan / Tap To verify',
	  url: 'https://www.palmtechniq.com/certificate',
	  siteName: 'PalmTechnIQ',
	  images: '/jopwe.jpg'
	}
}

export default function CertificatePage() {
     return <CertificateSearchInput />;
}
