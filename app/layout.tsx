import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/layout/nav-bar';
import Footer from '@/components/layout/footer';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | PalmTechnIQ',
		default: 'PalmTechnIQ',
	},
	description:
		'Learn cutting-edge tech skills with PalmTechnIQ! Explore our comprehensive courses and tutorials on programming, web development, data science, and more. Start your journey to becoming a tech expert today!',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={inter.className}>
					<NavBar />
					<div className='min-h-[70svh]'>
						<NextTopLoader
							color='green'
							showSpinner={false}
						/>
						{children}
					</div>
					<Toaster richColors />
					<Footer />
				</body>
			</html>
		</SessionProvider>
	);
}
