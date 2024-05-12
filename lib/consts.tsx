
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import * as Icons from './icons';
import React from 'react';

export const NAVLINKS: {
	name: string;
	href: string;
	title: string;
}[] =[
	{
		name: 'home',
		href: '/',
		title: 'Home',
	},
	{
		name: 'about',
		href: '/about',
		title: 'About',
	},

	
	{
		name: 'courses',
		href: '/courses',
		title: 'Courses',
	},
	{
		name: 'contact',
		href: '/contact',
		title: 'Contact',
	},
]


export const COURSEITEM: ICOURSEITEM[] = [
	// {
	// 	link: 'frontend-development',
	// 	name: 'Frontend Development',
	// },
	// {
	// 	link: 'backend-development',
	// 	name: 'Backend Development',
	// },
	{
		link: 'web-development',
		name: 'Web Development',
	},
	{
		link: 'smart-home-automation',
		name: 'Smart-home Automation',
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
		link: 'personal-branding',
		name: 'Personal Branding',
	},
	{
		link: 'project-management',
		name: 'Project Management',
	},
];

export const COURSEHEADER: ICOURSEHEADER[] = [
	{
		image: '/first.jpg',
		header: 'Become a PRO in Web Development.',
		description:
			'Explore what it entails to become a frontend developer.',
		link: 'web-development',
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
	// {
	// 	icon: <Icons.LaptopIcon />,
	// 	image: '/frontend.jpg',
	// 	content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
	// 	title: 'Frontend Development',
	// },
	// {
	// 	icon: <Icons.DatabaseIcon />,
	// 	image: '/backend.jpg',
	// 	content: 'Understand how to optimize server performance and manage databases, ensure security through authorisation mechanisms.',
	// 	title: 'Backend Development',
	// },
	{
		icon: <Icons.DatabaseIcon />,
		image: '/backend.jpg',
		content: 'Understand how to optimize server performance and manage databases, ensure security through authorisation mechanisms.',
		title: 'Web Development',
	},
	{
		icon: <Icons.DatabaseIcon />,
		image: '/backend.jpg',
		content: 'Understand how to optimize server performance and manage databases, ensure security through authorisation mechanisms.',
		title: 'Smart-home Automation',
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
		icon: <Icons.TrendIcon />,
		image: '/digitalmarketing.jpg',
		content: 'Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.',
		title: 'Personal Branding',
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
	// {
	// 	name: 'Frontend Development',
	// },
	// {
	// 	name: 'Backend Development',
	// },
	{
		name: 'Web Development',
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
	{
		name: 'Smart-home Automation',
	},
	{
		name: 'Personal Branding',
	},
]
export const OCCUPATION: IOCCUPATION[] = [
	{
		name: 'I am an undergraduate looking to improve my soft skill.',
	},
	{
		name: 'I am graduate looking to learn new/improve my soft skill.',
	},
	{
		name: 'I am a secondary school student ready to start a career in tech.',
	},
	{
		name: 'Employed and looking to upscale my soft skill.',
	},
	{
		name: 'Unemployed and looking to learn new soft skill.',
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
		title: 'Web Development',
		info: `Discover the core of web development. Learn to create user interfaces and master
			key programming languages and frameworks driving today's web.`,
		link: 'web-development',
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
		title: 'Smart-home Automation',
		info: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
        develop engaging user-focused web applications.`,
		link: 'smart-home-automation',
	},
	// {
	// 	image: '/images/bakenddev.jpg',
	// 	icon: [
	// 		<Icons.LaptopIcon key='1' />,
	// 		<Icons.NodeJSCourseIcon key='2' />,
	// 		<Icons.DatabaseIcon key='3' />,
	// 		<Icons.GitIcon key='4' />,
	// 	],
	// 	name: 'COURSE',
	// 	title: 'Back-end Development',
	// 	info: `Discover the core of back-end development. Learn to create user interfaces and master
	// 		key programming languages and frameworks driving today's web.`,
	// 	link: 'backend-development',
	// },
	// {
	// 	image: '/images/frontenddev.jpg',
	// 	icon: [
	// 		<Icons.NextJSIcon key='5' />,
	// 		<Icons.JavaScriptIcon key='6' />,
	// 		<Icons.ReactJSColorIcon key='7' />,
	// 		<Icons.Heading5Icon key='8' />,
	// 	],
	// 	name: 'COURSE',
	// 	title: 'Front-end Development',
	// 	info: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
    //     develop engaging user-focused web applications.`,
	// 	link: 'frontend-development',
	// },
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
		icon: <Icons.PaintbrushIcon key='5' />,
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
	textSnippet?: string;
	badgeType?: string;
	tutorVideoUrl: string;
	tutorName: string;
	description: string;
	summary: string[];
	price: string;
	classes: string;
	duration: string;
	numberOfStudentsErolled: string;
	language: string;
	certification: string;
	curriculum: {
		title: string;
		topics: {
			name: string;
			duration?: string;
			previewUrl?: string;
		}[];
			}[];
}[] = [
	{
	title: 'web-development',
	badgeType: 'Engineering',
	textSnippet: 'Become a master with our {courseDetails.title} Crash Course',
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
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Basic Introduction',
		topics: [
			{ name: 'Brush up on Java concepts', },
			{
			name: 'Associative Arrays',
				},
				{
			name: 'PHP fundamental',
				},

		]
			}
]
},
	{
	title: 'smart-home-automation',
	badgeType: 'Engineering',
	tutorVideoUrl: '/images/workspaces.webm',
	tutorName: 'John Paul',
	description: `In this course, you'll go behind the scenes and discover how websites store information, talk to each other, and make amazing things happen. Get ready to power up the internet!`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Basic Introduction',
		topics: [
			{ name: 'Brush up on Java concepts', },
			{
			name: 'Associative Arrays',
				},
				{
			name: 'PHP fundamental',
				},

		]
	}
]
	},
	{
	title: 'cybersecurity',
	badgeType: 'Security',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Jonathan Willams',
	description: `Become a digital defender! Protect your online world from sneaky cyber villains. Learn how to safeguard your information, spot online scams, and keep your devices safe from harm.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Basic Introduction',
		topics: [
			{
			name: 'Associative Arrays',
				},
				{
			name: 'PHP fundamental',
				},

		]
	}
]
	},
	{
	title: 'graphic-design',
	badgeType: 'Design',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Micheal Steve',
	description: `Make your ideas come to life! Learn to design amazing logos, posters, and images that grab attention and tell your story. Express yourself through colors, shapes, and stunning visuals.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum:[ 
		{
		title: 'Basic Introduction',
		topics: [
			{ name: 'Brush up on Java concepts', },
			{
			name: 'Associative Arrays',
				},
				{
			name: 'PHP fundamental',
				},

		]
	}
]
	},
	{
	title: 'ui%2Fux-designing',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Mawuli Smith',
	description: `Learn how to make websites look beautiful and work smoothly! In this class, you'll discover the secrets to designing websites that people love to use. We'll cover the basics of website building and teach you how to create stylish layouts, eye-catching visuals, and simple navigation. Can't wait to see you in class. Register now lets build something magical.`,
	summary: [
		'Basic understanding on what UI/UX designing is all about.',
		'Fundamentals of User Interface Design',
		'Tools for desinging and how to use them effectively in design.',
		'Understand visual design and how to implement them.',
		'How to conduct a user research.',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 weeks',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',

	curriculum: [
		{title: 'Basic Introduction',
		topics: 
		[
			{ name: 'What is UX Design', },
			{
			name: 'Importancce of UX design',
				},
				{
			name: 'User centered design',
				},

		],
	},

		{
			title:'Fundamentals of User Interface Design',
			topics: 
			[
				{ name: 'What is UI design', },
				{
				name: 'Best practices for UI design',

				},
				{
				name: 'Designing for mobile',

				},
			]
		}, 
		{
			title:'Introduction to design tools',
			topics: 
			[
				{ name: 'Designing tools', },
				{
				name: 'Getting started with Figma',

				},
			]
		}, 
		{
			title:'Visual Design fundamentals',
			topics: 
			[
				{ name: 'Typography', },
				{
				name: 'Color theory',

				},
				{
				name: 'Layout and composition',

				},
			]
		}, 
		{
			title:'User Research',
			topics: 
			[
				{ name: 'Introduction to user research', },
				{
				name: 'Creating user personas',

				},
				{
				name: 'User journey mapping',

				},
				{
				name: 'User testing and heuristics evaluation',

				},
			]
		}, 
	]
		},
		{
	title: 'mobile-app-development',
	badgeType: 'Application',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Sokeye David',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn avatar manuipulation',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum:[ 
		{
		title: 'Basic Introduction',
		topics: [
			{ name: 'Brush up on Java concepts', },
			{
			name: 'Amazon RDS Hands On',
				},
				{
			name: 'Associative Arrays',
				},

		]
	}
]
	},
	{
	title: 'digital-markerting',
	badgeType: 'Business',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Ignatius Emeka',
	description: `Reach the world with your message! Discover the exciting ways to promote products, ideas, or even yourself online. Learn how to use social media, create awesome ads, and attract fans and followers.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Basic Introduction',
		topics: [
			{ name: 'Brush up on Java concepts', },
			{
			name: `A Quick Introduction to Excel's Pivot Tables`,
		  },
		  
		]
	}
]
  },
	{
	title: 'personal-branding',
	badgeType: 'Business',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Ignatius Emeka',
	description: `Reach the world with your message! Discover the exciting ways to promote products, ideas, or even yourself online. Learn how to use social media, create awesome ads, and attract fans and followers.`,
	summary: [
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
		'In this course you will learn',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Basic Introduction',
		topics: [
			{ name: 'Brush up on Java concepts', },
			{
			name: `A Quick Introduction to Excel's Pivot Tables`,
		  },
		  
		]
	}
]
  },
	{
	title: 'project-management',
	badgeType: 'Business',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Akhabue Emmanuel',
	description: `Be the ultimate organizer! Master the skills to lead projects from start to finish. Learn to set goals, manage timelines, and keep your team on track for success. It's like being the boss of your own adventure!`,
	summary: [
		'Define key project management concepts and terminology.',
		' Understand the project life cycle.',
		'Develop essential project management skills: planning, scheduling, budgeting, and risk management.',
		'Apply effective communication and stakeholder management techniques.',
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Basic Introduction',
		topics: [
			{ name: 'Brush up on Java concepts', },
			{
			name: `A Quick Introduction to Excel's Pivot Tables`,
		  },
		  
		]
	}
]
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
			<Icons.StarIcon key='5' />,
			<Icons.StarIcon key='11' />,			<Icons.StarIcon key='14' />
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
		name: 'Lekan John',
		review: `I would not have gotten ready for a web developer position if I hadn't attended the PalmTechnIQ courses. I strongly recommend you try a course with them.`,
		userrole: 'Frontend Developer',
	},
	{
		image: '/images/wuli.jpg',
		name: 'Tobechukwu P.',
		review: `What I gained from the course was the ability to better understand coding and how to work better on a project. Just an amazing place to start your tech career.`,
		userrole: 'Frontend Developer',
	},
	{
		image: '/images/favour.jpg',
		name: 'Favour Mbegbu',
		review: `I highly recommend PalmTechnIQ to anyone looking to learn a beginner friendly course. This is where you go from beginner to PRO. I promise you will not regret it.`,
		userrole: 'Social media manager',
	},
];
