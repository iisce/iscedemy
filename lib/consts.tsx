
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
    image: "/webdevelopment.jpg",
	content: `Ready to build websites from scratch? Our crash course covers everything you need, from basic HTML and CSS to JavaScript. Learn to create sites that work on any device and look great too. Plus, we'll teach you how to make your sites easy . Whether you're a beginner, join us and start coding your way to success!`, 
	title: "Web Development",
  },
  {
    icon: <Icons.DatabaseIcon />,
    image: "/smarthomes.jpg",
    content: `Transform your living space into a futuristic, efficient haven with our Smart Home Automation crash course. Learn how to control lights, temperature, security, and more with just a tap on your smartphone or a simple voice command. Say goodbye to mundane tasks and embrace the convenience and energy savings of a smart home.`,  
	title: "Smart-home Automation",
  },
  {
    icon: <Icons.DataBaseColorIon />,
    image: "/cybersecurity.jpg",
	content: `Protect yourself and your digital assets from cyber threats with our Cybersecurity crash course. From safeguarding personal information to securing business networks, our comprehensive training will guide you to the latest techniques and best practices in cybersecurity. Gain peace of mind knowing that you're equipped to defend against hackers and keep your data safe.`, 
	title: "CyberSecurity",
  },
  {
    icon: <Icons.BookIcon />,
    image: "/uiux.jpg",
	content: `Create seamless, user-friendly experiences that delight and engage with our UI/UX course.Learn the principles of user interface and user experience design, and how to apply them to websites, apps, and digital products. From wireframing to prototyping, our hands-on training will equip you with the basic skills to design intuitive interfaces that users love to interact with.
	`, 
	title: "UI/UX Designing",
  },
  {
    icon: <Icons.TrendIcon />,
    image: "/digitalmarketing.jpg",
    content: `Join the digital revolution and learn how to reach your audience effectively in the online world. Our Digital Marketing crash course the necessary things you need from social media strategies to search engine optimization, equipping you with the fundamental skills to drive traffic, generate leads, and increase sales. Stay ahead of the competition and make your mark in the digital landscape.`,  
	title: "Digital Marketing",
  },
  {
    icon: <Icons.TrendIcon />,
    image: "/personalbranding.jpeg",
    content: `Stand out from the crowd and make a lasting impression with our Personal Branding crash course. Whether you're a freelancer, entrepreneur, or job seeker, building a strong personal brand is essential for success. Learn how to articulate your unique value proposition, establish credibility, and cultivate a compelling online presence that resonates with your target audience.
	`,     
	title: "Personal Branding",
  },
  {
    icon: <Icons.ReactJSColorIcon />,
    image: "/mobileappdevelopment.jpg",
    content: `Turn your app idea into reality with our Mobile App Development crash course. No coding experience? No problem. Our beginner-friendly course will guide you through the fundamental level of app development process, from concept to launch. Discover the tools and techniques used by professional developers and bring your innovative app to the fingertips of users worldwide.`,     
	title: "Mobile App Development",
  },
  {
    icon: <Icons.PaintbrushIcon />,
    image: "/graphicdesign.webp",
    content: `Showcase your creativity and bring your ideas to life with our Graphic Design crash course. Whether you're a budding artist or a business owner looking to enhance your brand, our crash course will teach you the fundamentals of design principles, typography, color theory, and industry-standard software. Unlock the power to communicate visually and make a lasting impression.`,     
	title: "Graphic Design",
  },
  {
    icon: <Icons.PaintbrushIcon />,
    image: "/projectmanagement.jpg",
    content: `Understand the art of project management and how you can take your career to new heights with our Project Management crash course. Whether you're overseeing a small team or leading a large-scale initiative, our crash course will equip you with the skills to plan, execute, and deliver projects on time and within budget. Gain the confidence and competence to tackle any project with ease.`,     
	title: "Project Management",
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
		image: '/images/frontenddev.jpg',
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
		image: '/images/bakenddev.jpg',
		icon: [
			<Icons.NextJSIcon key='5' />,
			<Icons.JavaScriptIcon key='6' />,
			<Icons.ReactJSColorIcon key='7' />,
			<Icons.Heading5Icon key='8' />,
		],
		name: 'COURSE',
		title: 'Smart-home Automation',
		info: ` Learn to control lights, thermostats, locks, and more with a tap on your phone or the sound of your voice. Create a futuristic home that works for you.`,
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
		info: `Create websites and apps that are both beautiful and intuitive. Know the art of user-centric design, ensuring that your products are easy to use and enjoyable to interact with.`,
	},
	{
		icon: <Icons.DataBaseColorIon key='10' />,
		name: ' COURSE',
		link: 'cybersecurity',
		image: '/images/cyber-security.jpg',
		title: 'CyberSecurity',
		info: `Protect your data, devices, and privacy from cyber threats. Learn to identify risks, prevent attacks, and safeguard your online presence in an ever-changing digital landscape.`,
	},
	{
		icon: <Icons.TrendIcon key='11' />,
		name: 'COURSE',
		link: 'digital-marketing',
		image: '/images/search-engine-marketing.jpg',
		title: 'Digital Marketing',
		info: `Reach the world with your message! Learn the strategies and tools to promote your business, product, or brand online. Master social media, search engines, and advertising to attract and engage customers.`,
	},
	{
		icon: <Icons.PaintbrushIcon key='5' />,
		name: ' COURSE',
		link: 'graphic-design',
		image: '/images/graphic-design.jpg',
		title: 'Graphic Design',
		info: `Understand the secrets of color, layout, and typography to create eye-catching visuals that tell a story. Design logos, posters, and graphics that captivate and inspire.` ,
	},
];
export const COURSE_OUTLINE: {
	title: string;
	textSnippet?: string;
	badgeType?: 'Engineering' | 'Application' | 'Business' | 'Security' | 'Technology' | 'Design' |  'default' | 'secondary' | 'destructive' | 'outline' |  null | undefined;
	tutorVideoUrl: string;
	tutorName: string;
	description: string;
	conclusion?: string;
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
	textSnippet: 'Take charge of your tech career with our {courseDetails.title} Crash Course!',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Ayobami Paul',
	description: `You'll master the fundamental languages of the web (HTML, CSS, and JavaScript) and dive into React, a powerful tool for creating dynamic user interfaces. Learn to craft stunning layouts, bring your designs to life with interactive elements, and create responsive websites that look amazing on any device. No prior coding experience is required – just a passion for building awesome things on the web!`,
	summary: [
		`Web Fundamentals: Grasp the core building blocks of every website: HTML for structure, CSS for style, and JavaScript for interactivity.`,
		`React Essentials:Get introduced to React, the go-to library for crafting modern, component-based web applications. Build interactive UIs that are easy to maintain and scale.`,
		`Responsive Design knowledge: Learn to create websites that adapt seamlessly to different screen sizes, ensuring a great user experience on desktops, tablets, and mobile devices.`,
		`Dynamic Web Pages: Go beyond static content and build web pages that respond to user actions, update in real time, and deliver a truly engaging experience.`,
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Introduction to Web Development',
		topics: [
			{ name: 'What is web development?', },
			{name: 'Front-end vs. back-end development',},
			{name: `Setting up your development environment`,},
		]
		},
		{
		title: 'HTML (HyperText Markup Language)',
		topics: [
			{ name: 'Basic HTML tags and structure', },
			{name: 'Creating elements, headings, paragraphs, lists, images, and links',},
			{name: `Building simple web page layouts`,},
		]
		},
		{
		title: 'CSS (Cascading Style Sheets)',
		topics: [
			{ name: 'Styling HTML elements: colors, fonts, spacing, and backgrounds', },
			{name: 'Creating responsive layouts with Flexbox or Grid',},
			{name: `Basic CSS animations and transitions`,},
		]
		},
		{
		title: 'JavaScript (JS)',
		topics: [
			{ name: 'Variables, data types, and operators', },
			{name: 'Functions and conditional statements (if/else)',},
			{name: `DOM manipulation: interacting with HTML elements using JS`,},
		]
		},
		{
		title: 'React Introduction',
		topics: [
			{ name: 'What is React?', },
			{name: 'Creating simple React components',},
			{name: `Basic state management and rendering`,},
		]
		},
],
conclusion: `By the end of this crash course, you'll have a solid foundation in web development and the skills to start building your own amazing websites!`,
},
	{
	title: 'smart-home-automation',
	badgeType: 'Technology',
	tutorVideoUrl: '/images/workspaces.webm',
	tutorName: 'Tope Bamidele',
	description: `Know the inner workings of smart-home automation in this captivating course! Let's show you the secrets of how devices communicate, store data, and orchestrate incredible experiences within your home. Get set to transform your living space with the power of automation!!`,
	summary: [
		`The ABCs of Smart Homes. You'll get a friendly introduction to the world of smart home automation, from the gadgets that make it happen to the amazing things you can do with it.`,
		`Know the control central behind the operation – smart hubs and controllers.You'll learn how they connect your devices and make your home truly smart.`,
		`Understand smart lighting – dim the lights for movie night, wake up to a sunrise glow, or set the mood with colorful scenes, all from your phone or with voice commands.`,
		`Keep your home safe and secure with smart security systems. Monitor cameras, lock doors remotely, and even receive alerts when someone's at your door.`,
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
			{ name: 'Introduction to smart home automation', },
			{
			name: 'Smart home hubs and controllers',
				},
			{name: 'Smart lighting',},
			{name: 'Smart security and surveillance systems',},
			{name: 'Smart temperature and environmental control',},
			{name: 'Smart  home entertainment',},

		]
	}
],
conclusion: `By the end of this course, you'll be able to understand and navigate your way around smart home automation, ready to transform your living space into a futuristic haven of comfort, convenience, and control.`,
	},
	{
	title: 'cybersecurity',
	badgeType: 'Security',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Tope Bamidele',
	description: `Become a digital defender! Protect your online world from sneaky cyber villains. Learn how to safeguard your information, spot online scams, and keep your devices safe from harm.`,
	summary: [
		`Get a solid foundation in the essentials of cybersecurity.You'll understand the common threats, and why protecting your online world is crucial.`,
		`Know different types of cyber attacks – from sneaky viruses and malware to phishing scams and identity theft. Learn how hackers operate so you can stay one step ahead.`,
		`Master the fundamental security measures everyone should know. From how to create strong passwords, safeguarding your personal information, and protect your devices from harm.`,
		` Dip your toes into the world of cryptography – the secret language of cybersecurity. Get a basic understanding of how encryption works and why it's so important for online security.`,
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
			{name: 'Introduction to cybersecurity',},
			{name: 'Types of cyber threats',},
			{name: 'basic security measures',},
			{name: 'Basic crytography',},
			{name: 'Threat detection and response',},
		]
	}
],
conclusion: `By the end of this course, you'll be equipped with the knowledge and tools to protect yourself in the digital world. You'll navigate the internet with confidence, knowing how to outsmart cyber villains and keep your information safe.`,
	},
	{
	title: 'graphic-design',
	badgeType: 'Design',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Mahoussi Ezekiel',
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
],
conclusion: ``,
	},
	{
	title: 'ui%2Fux-designing',
	badgeType: 'Design',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Mawuli Nwosu',
	description: `Learn how to make websites look beautiful and work smoothly! In this class, you'll discover the secrets to designing websites that people love to use. We'll cover the basics of website building and teach you how to create stylish layouts, eye-catching visuals, and simple navigation. Can't wait to see you in class. Register now lets build something magical.`,
	summary: [
		'Basic understanding on what UI/UX designing is all about.',
		`The magic behind user interface (UI) and user experience (UX) design. You'll understand why it's so important for creating websites and apps that people actually enjoy using.`,
		' Learn the secrets of user-centered design. Find out how to think like your target audience so you can build websites that cater to their needs and desires.',
		`Understand the fundamental principles of good UI design. Discover the best practices for creating intuitive interfaces that are both visually appealing and easy to navigate.`,
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
	],
	conclusion: `By the end of this course, you'll have a solid fundamental foundation in UI/UX design and the confidence to start building your own amazing websites. Let's create some digital magic together!`,
		},
{
	title: 'mobile-app-development',
	badgeType: 'Application',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Sokeye David',
	description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to
	develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
	summary: [
		'Understand the basic concepts of mobile app development',
		'Navigate around the flutter world',
		'Basic setups of andriod using code editiors',
		'Ability to use  platforms specific widgets',
		'Know how to use state maintenance widgets',
		'Understand navigation routing and controllers in flutter',
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
			{ name: 'What is flutter?', },
			{
			name: 'Advantages of using flutter for app development',
				},
			{name: 'Installation of code editior and flutter setup',},
			{name: 'Installation of andriod studio and setups',},
		]
	},
	{
		title: 'Platform specific widgets',
		topics: [
			{ name: 'Scaffold ', },
			{name: 'Textfield',},
			{name: 'Elevated buttons',},
			{name: 'App bar',},
			{name: 'Bottom navigation bar',},
			{name: 'floating action button',},
		]
	},
	{
		title: 'Platform independent widgets',
		topics: [
			{ name: 'Text widgets ', },
			{name: 'Image widgets',},
			{name: 'Icon widgets',},
			{name: 'Form widgets',},
		]
	},
	{
		title: 'State maintenance widgets',
		topics: [
			{ name: 'Stateless widgets', },
			{name: 'Stateful widgets',},
		]
	},
	{
		title: 'Using single child layouts',
		topics: [
			{ name: 'Container', },
			{name: 'Center',},
			{name: 'Expended',},
			{name: 'Padding',},
			{name: 'Sixed box',},
		]
	},
],
	conclusion: `By the end of this course, you'll have the skills and confidence to bring your app ideas to life, whether you're building the next viral sensation or a handy tool for your own personal use.`,
},
{
	title: 'digital-markerting',
	badgeType: 'Business',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Ignatius Emeka',
	description: `Become a digital marketing whiz and learn how to take your message to the masses in this exciting, hands-on course. Reach the world with your message! Discover the exciting ways to promote products, ideas, or even yourself online. Learn how to use social media, create awesome ads, and attract fans and followers.Whether you're promoting a business, a product, a cause, or even yourself, this course will equip you with the tools you need to make a real impact online.`,
	summary: [
		`The Digital Marketing scopes: You'll get a clear overview of the digital marketing world, from social media platforms and search engines to email campaigns and paid advertising. Understand how each piece fits into a comprehensive strategy.`,
		`Social Media Superstar: You'll learn to harness the power of platforms like Facebook, Instagram, Twitter, and LinkedIn.How to create engaging content, build a loyal following, and drive traffic to your website or landing pages.`,
		`Explore the different types of digital advertising, understand targeting options, and measure your ad performance.`,
		`Discover how to create valuable content that attracts and delights your audience. Learn to write compelling blog posts, articles, and social media updates that resonate with your target market.`,
	], 
	price: '50,000',
	classes: '5',
	duration: '1 week',
	numberOfStudentsErolled: '40',
	language: 'English',
	certification: 'Yes',
	curriculum: [
		{
		title: 'Digital Marketing Fundamentals',
		topics: [
			{ name: 'What is digital marketing and why is it essential?', },
			{
			name: `The different channels and tactics of digital marketing`,
		  },
		 {name: `Developing a digital marketing strategy`}
		  
		]
	},
		{
		title: 'Social Media Marketing',
		topics: [
			{ name: 'Choosing the right platforms for your audience', },
			{
			name: `Creating engaging content calendars`,
		  },
		 {name: `Running effective social media campaigns`},
		 {name: `Measuring social media success`},
		  
		]
	},
		{
		title: 'Digital Advertising',
		topics: [
			{ name: 'Understanding different ad formats (display, search, social, video)', },
		  
		]
	},
		{
		title: 'Content Marketing',
		topics: [
			{ name: 'Identifying your target audience and their needs', },
			{ name: 'Creating a content strategy', },
			{ name: 'Writing engaging and informative content', },
			{ name: 'Distributing and promoting your content', },
		  
		]
	},
],
	conclusion: `By the end of this course, you'll be equipped with the right digital marketing skills, ready to launch successful campaigns, grow your online presence, and achieve your marketing goals.`,
},
	{
	title: 'personal-branding',
	badgeType: 'Business',
	tutorVideoUrl: '/images/aboutsectionvideo.mp4',
	tutorName: 'Mahoussi Ezekiel',
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
],
conclusion: ``,
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
],
conclusion: ``,
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
		image: '/images/paul.jpg',
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
		name: 'Mawuli Nwosu',
		role: 'Design Expert',
		about: `Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim
		veniam quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure
		dolor in reprehenderit in voluptate.`,
		image: '/images/wuli.jpg',
	},
	{
		icon: [
			<Icons.FacebookIcon key='1' />,
			<Icons.TwitterIcon key='2' />,
			<Icons.LinkedinIcon key='3' />,
		],
		name: 'Tope Bamidele',
		role: 'Cyber Expert',
		about: `Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim
		veniam quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure
		dolor in reprehenderit in voluptate.`,
		image: '/images/tems.jpg',
	},
	{
		icon: [
			<Icons.FacebookIcon key='1' />,
			<Icons.TwitterIcon key='2' />,
			<Icons.LinkedinIcon key='3' />,
		],
		name: 'Tope Bamidele',
		role: 'Home Expert',
		about: `Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim
		veniam quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure
		dolor in reprehenderit in voluptate.`,
		image: '/images/tems.jpg',
	},
	{
		icon: [
			<Icons.FacebookIcon key='1' />,
			<Icons.TwitterIcon key='2' />,
			<Icons.LinkedinIcon key='3' />,
		],
		name: 'Akhabue Emmanuel',
		role: 'Project manager',
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
		name: 'Sokeye David',
		role: 'Flutter & Dart Developer',
		about: `Proficient in Dart programming language and Flutter framework Strong knowledge of object-oriented programming (OOP) principles Experience in developing and implementing UI/UX designs Expertise in integrating RESTful APIs`,
		image: '/images/david.jpg',
	},
	{
		icon: [
			<Icons.FacebookIcon key='1' />,
			<Icons.TwitterIcon key='2' />,
			<Icons.LinkedinIcon key='3' />,
		],
		name: 'Ignatius Emeka',
		role: 'Digital Specialist',
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
export const FREQUENTLY_ASKED_QUESTIONS: {
	question: string;
    answer: string;
}[] = [
	{
		question: 'What is PalmtechnIQ?',
		answer: 'PalmtechnIQ is an online educational platform that offers a wide range of courses and resources in various fields such as technology, business, arts, and more. Our mission is to provide accessible and high-quality education to learners worldwide.',
	},
	{
		question: 'How does PalmtechnIQ work?',
		answer: 'To get started with PalmtechnIQ, simply create an account on our website or mobile app. Browse through our course catalog, enroll in your preferred courses, and start learning at your own pace. Our platform offers interactive lessons, quizzes, projects, and discussions to enhance your learning experience.',
	},
	{
		question: 'What types of courses does PalmtechnIQ offer?',
		answer: 'We offer courses in diverse subjects, including programming, web development, data science, graphic design, entrepreneurship, and many more. Our courses are designed by industry experts and updated regularly to ensure relevance and quality.',
	},
	{
		question: 'Are the courses on PalmtechnIQ self-paced?',
		answer: 'Yes! most of our courses are self-paced, allowing you to learn at a time and place that suits you. You can progress through the lessons and complete assignments at your own speed, with no deadlines or fixed schedules.',
	},
	{
		question: 'Can I access PalmtechnIQ courses on mobile devices?',
		answer: ' Yes! PalmtechnIQ is accessible on both desktop and mobile devices. You can download our mobile app from the App Store or Google Play Store to access courses and continue learning on the go.',
	},
	{
		question: 'How much do PalmtechnIQ courses cost?',
		answer: 'While some courses on PalmtechnIQ are free, others may require payment. The cost of courses varies depending on factors such as course duration, complexity, and instructor expertise. We also offer discounts and promotions from time to time.',
	},
	{
		question: 'Can I get a certificate upon completing a course?',
		answer: 'Yes! upon successfully completing a course on PalmtechnIQ, you will receive a certificate of completion. Certificates can be shared on your LinkedIn profile or included in your resume to showcase your skills and achievements.',
	},
]
export const PRIVACY_POLICY: {
	title?: string;
	information : string;
	link?: string;
}[] = [
	{
		title: `Personal Information:`,
		information: ` When you register for an account enroll in
		courses or interact with our Services we may collect personal
		information such as your name email address date of birt and payment
		information.`,
	},
	{
		title: `Data Usage:`,
		information: `We may collect information about how you interact with
		our Services including your IP address browser type pages visited and
		timestamps.`,
	},
	{
		title: `Cookies:`,
		information: `We use cookies and similar tracking technologies to enhance
		your user experience and analyze usage patterns.`,
	},
	{
		title: `How We Use Your
		Information:`,
		information: `We use your personal information to provide and improve our Services
		communicate with you and personalize your experience.`,
	},
	{
		information: `We may use usage data and cookies for analytics purposes, such as
		monitoring traffic and user behavior on our website. • We may use your
		information to send you promotional emails newsletters and other
		marketing communications which you can opt out of at any time.
		`,
	},
	{
		title: `Information Sharing`,
		information: `We may share your information with third party service providers who
		assist us in operating our Services conducting our business or serving
		our users.`,
	},
	{
		information: `We may disclose your information in response to legal requests court
		orders or government regulations or to protect our rights property or
		safety or that of others. `,
	},
	{
		title: `Data Security:`,
		information: `We implement reasonable security measures to protect your
		information from unauthorized access alteration disclosure or
		destruction.`,
	},
	{
		information: ` Despite our efforts no method of transmission over the internet or
		electronic storage is completely secure and we cannot guarantee
		absolute security.`,
	},
	{
		title: `Childrens Privacy:`,
		information: `Our Services are not directed to children under the age of 13 and we
		do not knowingly collect personal information from children under 13.
		If you believe we have collected information from a child under 13
		please contact us immediately.`,
	},
	{
		title: `Your Choices`,
		information: `You can update your account information and communication
		preferences by logging into your account settings.`,
	},
	{
		information: `
		You can opt out of receiving promotional emails and marketing
		communications by following the instructions in the email or
		contacting us directly.`,
	}, 
	{
		title: `Changes to this Privacy Policy`,
		information: `We may update this Privacy Policy from time to time. We will notify
		you of any material changes by posting the new Privacy Policy on this
		page.`,
		link: 'contact'
	},
	{
		information: `If you have any questions or concerns about this Privacy Policy or our
        privacy practices please contact us at [Contact Information]. By using
        our Services you consent to the collection use and sharing of your
        information as described in this Privacy Policy.`,
	},
]
