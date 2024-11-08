import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'PalmTechnIQ',
		short_name: 'PalmTechnIQ',
		description: 'Learn cutting-edge tech skills with PalmTechnIQ! Explore our comprehensive courses and tutorials on programming, web development, data science, and more. Start your journey to becoming a tech expert today!',
		start_url: '/',
		display: 'fullscreen',
		background_color: '#16a34a',
		theme_color: '#fff',
		icons: [
			{
				src: '/assets/palmtechniqlogo.png',
				sizes: 'any',
				type: 'image/png',
			},
		],
	};
}
