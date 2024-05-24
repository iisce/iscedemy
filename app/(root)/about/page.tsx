import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import AboutNav from '@/components/pages/about/about-nav';
import AboutSection from '@/components/pages/about/about-section';
import OurMission from '@/components/pages/about/our-mission';
import OurStory from '@/components/pages/about/our-story';
import OurTeam from '@/components/pages/about/our-team';
import OurValues from '@/components/pages/about/our-values';

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
