import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/layout/nav-bar';
import Footer from '@/components/layout/footer';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import { Chatbot } from '@/components/component/chatbot';
import { getUserById } from '@/data/user';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: 'PalmTechnIQ | %s ',
		default: 'PalmTechnIQ',
	},
	description:
		'Learn cutting-edge tech skills with PalmTechnIQ! Explore our comprehensive courses and tutorials on programming, web development, data science, and more. Start your journey to becoming a tech expert today!',
	applicationName: 'PalmTechnIQ',
	referrer: 'origin-when-cross-origin',

	keywords: [
		'PalmTechnIQ',
		'palmtechniq',
		'online learning platform',
		'free online learning platform',
		'online tech school',
		'online alt school',
		'free online tech school',
		'tech skills',
		'digital skill',
		'top online leanring platform in nigeria',
		'free online learning platform in nigeria',
		'soft skiils',
		'free digital skills',
		'best online learning platform',
		'Web development',
		'web development course',
		'online web development course',
		'free web development course',
		'free online web development course',
		'online courses',
		'courses',
		'free online courses',
		'digital marketing',
		'free digital marketing course',
		'free online digital marketing course',
		'digital courses',
		'free digital courses',
		'cybersecurity',
		'cybersecurity course',
		'free cybersecurity course',
		'free online cybersecurity course',
		'app development',
		'mobile app development',
		'app development course',
		'online app development',
		'online mobile app development',
		'free mobile app development course',
		'mobile app development course',
		'free app development course',
		'graphic design',
		'graphic design course',
		'free online graphic design course',
		'online graphic design',
		'ui/ux',
		'ui/ux course',
		'ui/ux online course',
		'free online ui/ux course',
		'smart-home automation',
		'smart-home automation course',
		'smart-home automation online course',
		'free online smart-home automation',
		'smart home automation',
		'smart home automation course',
		'smart home automation online course',
		'free online smart home automation',
		'project management',
		'project management course',
		'online project management course',
		'free online project management course',
		'free online project management',
	],
	metadataBase: new URL('https://www.palmtechniq.com'),
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/en-US',
			'de-DE': '/de-DE',
		},
	},

	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},

	manifest: 'https://nextjs.org/manifest.json',
	category: 'technology',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	const dbUser = await getUserById(session?.user?.id ?? '');
	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={inter.className}>
					<NavBar user={dbUser} />
					<div className='min-h-[70svh]'>
						<NextTopLoader
							color='green'
							showSpinner={false}
						/>
						{children}
					</div>
					<Chatbot />
					<Toaster richColors />
					<Footer />
				</body>
			</html>
		</SessionProvider>
	);
}
