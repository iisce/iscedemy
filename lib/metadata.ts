import { Metadata } from 'next';

export interface DynamicMetadataOptions {
	title: string;
	description: string;
	url?: string;
	image?: string;
	imageAlt?: string;
	type?: 'website' | 'article' | 'video' | 'profile';
	siteName?: string;
	keywords?: string[];
	canonical?: string;
	noIndex?: boolean;
	noFollow?: boolean;
}

const defaultSiteName = 'PalmTechnIQ';
const defaultBaseUrl = 'https://www.palmtechniq.com';

/**
 * Generates comprehensive metadata for pages with SEO optimization
 * @param options - Metadata configuration options
 * @returns Complete Metadata object for Next.js
 */
export function generateMetadata(options: DynamicMetadataOptions): Metadata {
	const {
		title,
		description,
		url,
		image,
		imageAlt,
		type = 'website',
		siteName = defaultSiteName,
		keywords = [],
		canonical,
		noIndex = false,
		noFollow = false,
	} = options;

	const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
	const pageUrl = url ? `${defaultBaseUrl}${url}` : defaultBaseUrl;
	const ogImage = image || '/innovation.jpg';
	const canonicalUrl = canonical ? `${defaultBaseUrl}${canonical}` : pageUrl;

	return {
		title: {
			absolute: fullTitle,
		},
		description,
		keywords: keywords.length > 0 ? keywords : undefined,
		metadataBase: new URL(defaultBaseUrl),
		alternates: {
			canonical: canonicalUrl,
			languages: {
				'en-US': '/en-US',
				'de-DE': '/de-DE',
			},
		},
		openGraph: {
			title: fullTitle,
			description,
			url: pageUrl,
			siteName,
			images: [
				{
					url: ogImage,
					alt: imageAlt || title,
					width: 1200,
					height: 630,
				},
			],
			type,
			locale: 'en_US',
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			images: [ogImage],
		},
		robots: {
			index: !noIndex,
			follow: !noFollow,
			googleBot: {
				index: !noIndex,
				follow: !noFollow,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	};
}

/**
 * Generates metadata for course pages
 */
export function generateCourseMetadata(
	courseTitle: string,
	courseDescription: string,
	courseImage?: string,
	courseId?: string,
): Metadata {
	return generateMetadata({
		title: courseTitle.split('-').join(' '),
		description: courseDescription,
		url: courseId ? `/courses/${courseId}` : undefined,
		image: courseImage,
		imageAlt: courseTitle,
		type: 'article',
		keywords: [
			'PalmTechnIQ',
			'online course',
			'tech skills',
			'digital skills',
			courseTitle,
			...courseDescription.split(' ').slice(0, 10),
		],
		canonical: courseId ? `/courses/${courseId}` : undefined,
	});
}

/**
 * Generates metadata for blog posts
 */
export function generateBlogMetadata(
	postTitle: string,
	postDescription: string,
	postImage?: string,
	postSlug?: string,
): Metadata {
	return generateMetadata({
		title: postTitle,
		description: postDescription,
		url: postSlug ? `/blog/${postSlug}` : undefined,
		image: postImage,
		imageAlt: postTitle,
		type: 'article',
		keywords: [
			'PalmTechnIQ',
			'blog',
			'tech blog',
			postTitle,
			...postDescription.split(' ').slice(0, 10),
		],
		canonical: postSlug ? `/blog/${postSlug}` : undefined,
	});
}

/**
 * Generates metadata for user profile pages
 */
export function generateProfileMetadata(
	profileName: string,
	profileType: 'tutor' | 'student' = 'student',
): Metadata {
	return generateMetadata({
		title: `${profileName}'s ${profileType === 'tutor' ? 'Tutor' : 'Student'} Profile`,
		description: `View ${profileName}'s ${profileType} profile on PalmTechnIQ`,
		type: 'profile',
		keywords: ['PalmTechnIQ', 'profile', profileType, profileName],
		noIndex: true, // Profile pages typically shouldn't be indexed
		noFollow: true,
	});
}
