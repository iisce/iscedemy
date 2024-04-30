
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import * as Icons from './icons';
import React from 'react';

export const COURSEITEM: ICOURSEITEM[] = [
	{
		link: 'frontend-development',
		name: 'Frontend Development',
	},
	{
		link: 'backend-development',
		name: 'Backend Development',
	},
	{
		link: 'cybersecurity',
		name: 'Cybersecurity',
	},
	{
		link: 'graphic-design',
		name: 'Graphic Design',
	},
	{
		link: 'ui%2Fux-designing',
		name: 'UI/UX Design',
	},
	{
		link: 'mobile-app-development',
		name: 'Mobile App Development',
	},
	{
		link: 'digital-markerting',
		name: 'Digital Marketing',
	},
	{
		link: 'project-management',
		name: 'Project Management',
	},
];

export const COURSEHEADER: ICOURSEHEADER[] = [
	{
		image: '/first.jpg',
		header: 'Become a PRO in Frontend Development.',
		description:
			'Explore what it entails to become a frontend developer.',
		link: 'frontend-development',
	},
	{
		image: '/second.jpg',
		header: 'Learn to Create NEAT Experiences.',
		description:
			'UI/UX classes are available, indulge in the world of creativity.',
		link: 'ui%2Fux-designing',
	},
	{
		image: '/third.jpg',
		header: 'Up your SKILLS by Learning Cybersecurity',
		description:
			'Explore what it entails in order to prevent cyber attacks.',
		link: 'cybersecurity',
	},
];

export const COURSELIST: ICOURSELIST2[] = [
	{
		icon: <Icons.LaptopIcon />,
		image: '/frontend.jpg',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Frontend Development',
	},
	{
		icon: <Icons.DatabaseIcon />,
		image: '/backend.jpg',
		content: 'Understand how to optimize server performance and manage databases, ensure security through authorisation mechanisms.',
		title: 'Backend Development',
	},
	{
		icon: <Icons.DataBaseColorIon />,
		image: '/cybersecurity.jpg',
		content: 'Understand data management, optimizing server performance fgfigignrg rgrngringr grgnrignrigrginrignrigrg rgnrigrigrignrig',
		title: 'CyberSecurity',
	},
	{
		icon: <Icons.BookIcon />,
		image: '/uiux.jpg',
		content: 'Understand enhamced user satisfaction, higher engagement and user accessibility.',
		title: 'UI/UX Designing',
	},
	{
		icon: <Icons.TrendIcon />,
		image: '/digitalmarketing.jpg',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Digital Marketing',
	},
	{
		icon: <Icons.ReactJSColorIcon />,
		image: '/mobileappdevelopment.jpg',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Mobile App Development',
	},
	{
		icon: <Icons.PaintbrushIcon />,
		image: '/graphicdesign.webp',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Graphic Design',
	},
	{
		icon: <Icons.PaintbrushIcon />,
		image: '/graphicdesign.webp',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Project Management',
	},
];
export const COURSES: ICOURSES[] = [
	{
		name: 'Frontend Development',
	},
	{
		name: 'Backend Development',
	},
	{
		name: 'CyberSecurity',
	},
	{
		name: 'Graphic Design',
	},
	{
		name: 'UI/UX Design',
	},
	{
		name: 'Mobile Development',
	},
	{
		name: 'Project Management',
	},
]
export const OCCUPATION: IOCCUPATION[] = [
	{
		name: 'I am a student',
	},
	{
		name: 'I a graduate looking to learn new soft skill',
	},
	{
		name: 'I am a master degree holder',
	},
	{
		name: 'Employed and looking to upscale my soft skill',
	},
	{
		name: 'Unemployed and looking to learn new soft skill',
	},
]
export const COURSE_PREVIEW: {
	icon?: React.ReactNode[];
	image?: StaticImport | string;
	name: string;
	title?: string;
	info: string;
	link?: string;
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
		link: 'backend-development',
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
		link: 'frontend-development',
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
		link: 'ui%2Fux-designing',
		image: '/images/user-interface-design.jpg',
		title: 'UI/UX',
		info: `Explore a beginner-friendly, popular programming language that's renowned for its readability and
        extensive range of applications.`,
	},
	{
		icon: <Icons.DataBaseColorIon key='10' />,
		name: ' COURSE',
		link: 'cybersecurity',
		image: '/images/cyber-security.jpg',
		title: 'CyberSecurity',
		info: `Master SQL, an essential skill in data analysis and management, from creating to querying and manipulating
        databases.`,
	},
	{
		icon: <Icons.TrendIcon key='11' />,
		name: 'COURSE',
		link: 'digital-marketing',
		image: '/images/search-engine-marketing.jpg',
		title: 'Digital Marketing',
		info: `Master the building blocks of web development, understand the structure of web
        pages, and start building real websites.`,
	},
	{
		icon: <Icons.PaintbrushIcon key='12' />,
		name: ' COURSE',
		link: 'graphic-design',
		image: '/images/graphic-design.jpg',
		title: 'Graphic Design',
		info: `Dive into the world of JavaScript, the programming language to manipulate web page elements, build web
        applications, and more.`,
	},
];
export const COURSE_OUTLINE: {
	title: string;
	tutorVideoUrl: string;
	tutorName: string;
	description: string;
	summary: string[];
	price: string;
	lessons: string;
	duration: string;
	numberOfStudentsErolled: string;
	language: string;
	certification: string;
}[] = [
  {
	title: 'frontend-development',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Ayobami Paul',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	lessons: '12',
	duration: '2 weeks',
	numberOfStudentsErolled: '657',
	language: 'English',
	certification: 'Yes',
  },
  {
	title: 'backend-development',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'John Paul',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	lessons: '12',
	duration: '2 weeks',
	numberOfStudentsErolled: '657',
	language: 'English',
	certification: 'Yes',
  },
  {
	title: 'cybersecurity',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Jonathan Willams',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	lessons: '12',
	duration: '2 weeks',
	numberOfStudentsErolled: '657',
	language: 'English',
	certification: 'Yes',
  },
  {
	title: 'graphic-design',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Micheal Steve',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	lessons: '12',
	duration: '2 weeks',
	numberOfStudentsErolled: '657',
	language: 'English',
	certification: 'Yes',
  },
  {
	title: 'ui%2Fux-designing',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Mawuli Smith',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	lessons: '12',
	duration: '2 weeks',
	numberOfStudentsErolled: '657',
	language: 'English',
	certification: 'Yes',
  },
  {
	title: 'mobile-app-development',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Sokeye David',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	lessons: '12',
	duration: '2 weeks',
	numberOfStudentsErolled: '657',
	language: 'English',
	certification: 'Yes',
  },
  {
	title: 'digital-markerting',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Ignatius Emeka',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	lessons: '12',
	duration: '2 weeks',
	numberOfStudentsErolled: '657',
	language: 'English',
	certification: 'Yes',
  },
	];
export const CURRICULUM: {
	title: string;
	topics: {
		name: string;
		duration?: string;
		questions?: number;
		previewUrl?: string;
	}[];
}[] = [
	{
		title: 'Basic Introduction',
		topics: [
		  {
			name: 'Brush up on Java concepts',
			previewUrl: 'Preview',
		  },
		  {
			name: `A Quick Introduction to Excel's Pivot Tables`,
			duration: '3 minutes',
		  },
		  {
			name: 'Amazon RDS Hands On',
			duration: '3 minutes',
		  },
		  {
			name: 'Associative Arrays',
			duration: '3 minutes',
		  },
		  {
			name: 'PHP fundamental',
			duration: '3 minutes',
			questions: 2,
		  },
		],
	  },
	  {
		title: 'Fundamental Concept Of HTML',
		topics: [
			{
				name: `A note on Semantic HTML`,
				duration: `3 minutes`,
			},
			{
				name: `Centering our Page`,
				duration: `3 minutes`,
			},
			{
				name: `Class and ID Selectors`,
				duration: `3 minutes`,
			},
			{
				name: `Code download`,
				duration: `3 minutes`,
			},
		],
	},
];
export const TUTOR_REVIEWS: {
	tutorName: string;
	name: string;
	image: StaticImport | string;
	rating: React.ReactNode[];
	title: string;
	description: string;
}[] = [
	{
		tutorName: 'Ayobami Paul',
		name: 'James Paul',
		image: '/images/lekan.jpg',
		rating: [
			<Icons.StarIcon key='1' />,
			<Icons.StarIcon key='2'  />,
			<Icons.StarIcon key='3' />,
			<Icons.StarIcon key='4' />,
			<Icons.StarIcon key='5' />,
		],
		title: 'Amazing Course',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
		dolore magna aliqua.`
	},
	{
		tutorName: 'Ayobami Paul',
		name: 'Nicolas Bassey',
		image: '/images/lekan.jpg',
		rating: [
			<Icons.StarIcon key='6' />,
			<Icons.StarIcon key='7' />,
			<Icons.StarIcon key='8' />,
			<Icons.StarIcon key='9' />,
			<Icons.StarIcon key='10' />,
		],
		title: 'Amazing Course',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
		dolore magna aliqua.`
	},
	{
		tutorName: 'John Paul',
		name: 'Adam Pearce',
		image: '/images/lekan.jpg',
		rating: [
			<Icons.StarIcon key='11' />,
			<Icons.StarIcon key='12' />,
			<Icons.StarIcon key='13' />,
			<Icons.StarIcon key='14' />
		],
		title: 'Amazing Course',
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
		dolore magna aliqua.`
	}
]
export const TUTOR_PROFILE: {
	name: string;
	about: string;
	role: string;
	image: StaticImport | string;
	icon: React.ReactNode[];
}[] = [
	{
		icon: [
			<Icons.FacebookIcon key='1' />,
			<Icons.TwitterIcon key='2' />,
			<Icons.LinkedinIcon key='3' />,
		],
		name: 'Ayobami Paul',
		role: 'Design Expert',
		about: `Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim
		veniam quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure
		dolor in reprehenderit in voluptate.`,
		image: '/images/lekan.jpg',
	},
	{
		icon: [
			<Icons.FacebookIcon key='1' />,
			<Icons.TwitterIcon key='2' />,
			<Icons.LinkedinIcon key='3' />,
		],
		name: 'John Paul',
		role: 'Design Expert',
		about: `Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim
		veniam quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure
		dolor in reprehenderit in voluptate.`,
		image: '/images/lekan.jpg',
	},
	{
		icon: [
			<Icons.FacebookIcon key='1' />,
			<Icons.TwitterIcon key='2' />,
			<Icons.LinkedinIcon key='3' />,
		],
		name: 'Jonathan Willams',
		role: 'Cyber Expert',
		about: `Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim
		veniam quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure
		dolor in reprehenderit in voluptate.`,
		image: '/images/lekan.jpg',
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
