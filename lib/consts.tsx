import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import * as Icons from './icons';

export const COURSEITEM: ICOURSEITEM[] = [
	{
		link: '',
		name: 'Frontend Development',
	},
	{
		link: '',
		name: 'Backend Development',
	},
	{
		link: '',
		name: 'Cybersecurity',
	},
	{
		link: '',
		name: 'Graphic Design',
	},
	{
		link: '',
		name: 'UI/UX Design',
	},
	{
		link: '',
		name: 'Mobile App Development',
	},
	{
		link: '',
		name: 'Digital Marketing',
	},
];

export const COURSEHEADER: ICOURSEHEADER[] = [
	{
		image: '/first.jpg',
		header: 'Become a PRO in Frontend Development.',
		description:
			'Explore what it entails to become a frontend developer.',
		link: '',
	},
	{
		image: '/second.jpg',
		header: 'Learn to Create NEAT Experiences.',
		description:
			'UI/UX classes are available, indulge in the world of creativity.',
		link: '',
	},
	{
		image: '/third.jpg',
		header: 'Up your SKILLS by Learning Cybersecurity',
		description:
			'Explore what it entails in order to prevent cyber attacks.',
		link: '',
	},
];

export const COURSELIST: ICOURSELIST[] = [
	{
		icon: [
			<Icons.LaptopIcon/>
		],
		image: '/frontend.jpg',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Frontend Development',
		link: '',
	},
	{
		icon: [
			<Icons.DatabaseIcon/>
		],
		image: '/backend.jpg',
		content: 'Understand how to optimize server performance and manage databases, ensure security through authorisation mechanisms.',
		title: 'Backend Development',
		link: '',
	},
	{
		icon: [
			<Icons.DataBaseColorIon/>
		],
		image: '/cybersecurity.jpg',
		content: 'Understand data management, optimizing server performance fgfigignrg rgrngringr grgnrignrigrginrignrigrg rgnrigrigrignrig',
		title: 'CyberSecurity',
		link: '',
	},
	{
		icon: [ 
			<Icons.BookIcon/>
		],
		image: '/uiux.jpg',
		content: 'Understand enhamced user satisfaction, higher engagement and user accessibility.',
		title: 'UI/UX Designing',
		link: '',
	},
	{
		icon: [ 
			<Icons.TrendIcon/>
		],
		image: '/digitalmarketing.jpg',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Digital Marketing',
		link: '',
	},
	{
		icon: [ 
			<Icons.ReactJSColorIcon/>
		],
		image: '/mobileappdevelopment.jpg',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Mobile App Development',
		link: '',
	},
	{
		icon: [ 
			<Icons.PaintbrushIcon/>
		],
		image: '/graphicdesign.webp',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Graphic Design',
		link: '',
	},
];

export const COURSE_PREVIEW: {
	icon?: React.ReactNode[];
	image?: StaticImport | string;
	name: string;
	title?: string;
	info: string;
}[] = [
	{
		image: '/images/bakenddev.jpg',
		icon: [
			<Icons.LaptopIcon key='1' />,
			<Icons.NodeJSCourseIcon key='2' />,
			<Icons.DatabaseIcon key='3' />,
			<Icons.GitIcon key='4' />,
		],
		name: 'COURSE',
		title: 'Back-end Development',
		info: `Discover the core of back-end development. Learn to create user interfaces and master
        key programming languages and frameworks driving today's web.`,
	},
	{
		image: '/images/frontenddev.jpg',
		icon: [
			<Icons.NextJSIcon key='5' />,
			<Icons.JavaScriptIcon key='6' />,
			<Icons.ReactJSColorIcon key='7' />,
			<Icons.Heading5Icon key='8' />,
		],
		name: 'COURSE',
		title: 'Front-end Development',
		info: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
        develop engaging user-focused web applications.`,
	},
];
export const OTHER_COURSE_PREVIEW: {
	icon?: React.ReactNode;
	name: string;
	image?: StaticImport | string;
	title?: string;
	link?: string;
	info: string;
}[] = [
	{
		icon: <Icons.BookIcon key='9' />,
		name: 'COURSE',
		link: '/',
		image:'/images/user-interface-design.jpg',
		title: 'UI/UX',
		info: `Explore a beginner-friendly, popular programming language that's renowned for its readability and
        extensive range of applications.`,
	},
	{
		icon: <Icons.DataBaseColorIon key='10' />,
		name: ' COURSE',
		link: '/',
		image:'/images/cyber-security.jpg',
		title: 'CyberSecurity',
		info: `Master SQL, an essential skill in data analysis and management, from creating to querying and manipulating
        databases.`,
	},
	{
		icon: <Icons.TrendIcon key='11' />,
		name: 'COURSE',
		link: '/',
		image:'/images/search-engine-marketing.jpg',
		title: 'Digital Marketing',
		info: `Master the building blocks of web development, understand the structure of web
        pages, and start building real websites.`,
	},
	{
		icon: <Icons.PaintbrushIcon key='12' />,
		name: ' COURSE',
		link: '/',
		image:'/images/graphic-design.jpg',
		title: 'Graphic Design',
		info: `Dive into the world of JavaScript, the programming language to manipulate web page elements, build web
        applications, and more.`,
	},
];
export const TESTIMONIALS: {
	image?: StaticImport | string;
	name: string;
	review: string;
	userrole: string;
}[] = [
	{
		image: '/images/lekan.jpg',
		name: 'Lekan.',
		review: `I would not have gotten ready for a web developer position if I hadn't attended the ISCEDemy courses.giugiguigigikjkbbkjb`,
		userrole: 'Frontend Developer',
	},
	{
		image: '/images/wuli.jpg',
		name: 'Tobechukwu P.',
		review: `What I gained from the course was the ability to better understand coding and how to work on a project.`,
		userrole: 'Frontend Developer',
	},
	{
		image: '/images/favour.jpg',
		name: 'Favour S.',
		review: `I highly recommend ISCEDemy to anyone looking to learn Web Development. I promise you will not regret it.`,
		userrole: 'Frontend Developer',
	},
];
