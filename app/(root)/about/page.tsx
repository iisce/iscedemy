import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import AboutNav from '@/components/pages/about/about-nav';
import AboutSection from '@/components/pages/about/about-section';
import OurMission from '@/components/pages/about/our-mission';
import OurStory from '@/components/pages/about/our-story';
import OurTeam from '@/components/pages/about/our-team';
import OurValues from '@/components/pages/about/our-values';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us',
	description: 'We believe in child education! The way to change the world is by enabling them to paint a world of their own.',
	metadataBase: new URL('https://www.palmtechniq.com/about'),
	alternates:{
	  canonical: '/about',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: 'About Us',
	  description: 'We believe in child education! The way to change the world is by enabling them to paint a world of their own.',
	  url: 'https://www.palmtechniq.com/about',
	  siteName: 'PalmTechnIQ',
	  images: '/jopwe.jpg'
	}
  }

export default function About() {
	return (
		<>
			<AboutSection />
			<AboutNav />
			<MaxWidthWrapper className='text-black grid md:gap-5 relative '>
				<OurStory />
				<OurValues />
				<OurMission />
				<OurTeam />
			</MaxWidthWrapper>
		</>
	);
}
