import {
     BookOpenIcon,
     CalendarIcon,
     HomeIcon,
     UserCircleIcon,
     UsersIcon,
     WalletIcon,
} from "@heroicons/react/24/outline";
import { BarChartIcon, FileTextIcon } from "@radix-ui/react-icons";
import { Clipboard, Code, Layout, Shield } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
import * as Icons from "./icons";
import {
     ICOURSEHEADER,
     ICOURSEITEM,
     ICOURSELIST2,
     ICOURSES,
     IOCCUPATION,
     ITYPE,
} from "./types";

export const NAVLINKS: {
     name: string;
     href: string;
     title: string;
}[] = [
     {
          name: "home",
          href: "/",
          title: "Home",
     },
     {
          name: "about",
          href: "/about",
          title: "About",
     },

     {
          name: "courses",
          href: "/courses",
          title: "Courses",
     },
     {
          name: "blog",
          href: "/blog",
          title: "Blogs",
     },
     {
          name: "contact",
          href: "/contact",
          title: "Contact",
     },
];

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
          link: "data-analytics",
          name: "Data Analytics",
     },
     {
          link: "web-development",
          name: "Web Development",
     },
     {
          link: "smart-home-automation",
          name: "Smart-home Automation",
     },
     {
          link: "cybersecurity",
          name: "Cybersecurity",
     },
     {
          link: "graphic-design",
          name: "Graphic Design",
     },
     {
          link: "ui-ux-designing",
          name: "UI/UX Design",
     },
     {
          link: "mobile-app-development",
          name: "Mobile App Development",
     },
     {
          link: "digital-marketing",
          name: "Digital Marketing",
     },
     {
          link: "video-editing",
          name: "Video Editing",
     },
     {
          link: "project-management",
          name: "Project Management",
     },
];

export const COURSEHEADER: ICOURSEHEADER[] = [
     {
          image: "/first.jpg",
          header: "Become a PRO in Web Development.",
          description:
               "Explore what it entails to become a frontend developer.",
          link: "web-development",
     },
     {
          image: "/second.jpg",
          header: "Learn to Create NEAT Experiences.",
          description:
               "UI/UX classes are available, indulge in the world of creativity.",
          link: "ui-ux-designing",
     },
     {
          image: "/third.jpg",
          header: "Up your SKILLS by Learning Cybersecurity",
          description:
               "Explore what it entails in order to prevent cyber attacks.",
          link: "cybersecurity",
     },
     {
          header: "Explore Crash Courses",
          description: "Quick, intensive learning for beginners.",
          link: "crash-courses",
          image: "/crash_course_program_palmtechniq.jpg",
     },
     {
          header: "3-Month Programs",
          description: "Intermediate skills with hands-on projects.",
          link: "intermediate-courses",
          image: "/intermediate_course_program_palmtechniq.jpg",
     },
     {
          header: "6-Month Programs",
          description: "Advanced training for professionals.",
          link: "advanced-courses ",
          image: "/images/data-analytics.jpeg",
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
          image: "/video-editing.jpg",
          content: `Become a visual storytelling master with our Video Editing course. Learn editing, and enhancing video footage to create captivating narratives. From basic techniques to advanced effects, our hands-on training will empower you to transform raw footage into polished masterpieces. Bring your video visions to life.
	`,
          title: "Video Editing",
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
          name: "Web Development",
     },
     {
          name: "CyberSecurity",
     },
     {
          name: "Data Analytics",
     },
     {
          name: "Graphic Design",
     },
     {
          name: "UI/UX Design",
     },
     {
          name: "Mobile Development",
     },
     {
          name: "Project Management",
     },
     {
          name: "Digital Marketing",
     },
     {
          name: "Video Editing",
     },
     {
          name: "Smart-home Automation",
     },
];
export const OCCUPATION: IOCCUPATION[] = [
     {
          name: "I am an undergraduate looking to improve my soft skill.",
     },
     {
          name: "I am graduate looking to learn new/improve my soft skill.",
     },
     {
          name: "I am a secondary school student ready to start a career in tech.",
     },
     {
          name: "Employed and looking to upscale my soft skill.",
     },
     {
          name: "Unemployed and looking to learn new soft skill.",
     },
];
export const TYPE: ITYPE[] = [
     {
          name: "Virtual",
     },
     {
          name: "Physical",
     },
];
export const COURSE_PREVIEW: {
     icon?: React.ReactNode[];
     image?: StaticImport | string;
     name: string;
     title?: string;
     info: string;
     link?: string;
}[] = [
     {
          image: "/images/frontenddev.jpg",
          icon: [
               <Icons.LaptopIcon key="1" />,
               <Icons.NodeJSCourseIcon key="2" />,
               <Icons.DatabaseIcon key="3" />,
               <Icons.GitIcon key="4" />,
          ],
          name: "COURSE",
          title: "Web Development",
          info: `Discover the core of web development. Learn to create user interfaces and master
			key programming languages and frameworks driving today's web.`,
          link: "web-development",
     },
     {
          image: "/images/bakenddev.jpg",
          icon: [
               <Icons.NextJSIcon key="5" />,
               <Icons.JavaScriptIcon key="6" />,
               <Icons.ReactJSColorIcon key="7" />,
               <Icons.Heading5Icon key="8" />,
          ],
          name: "COURSE",
          title: "Smart-home Automation",
          info: ` Learn to control lights, thermostats, locks, and more with a tap on your phone or the sound of your voice. Create a futuristic home that works for you.`,
          link: "smart-home-automation",
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
          icon: <Icons.BookIcon key="9" />,
          name: "COURSE",
          link: "ui-ux-designing",
          image: "/images/user-interface-design.jpg",
          title: "UI/UX",
          info: `Create websites and apps that are both beautiful and intuitive. Know the art of user-centric design, ensuring that your products are easy to use and enjoyable to interact with.`,
     },
     {
          icon: <Icons.DataBaseColorIon key="10" />,
          name: " COURSE",
          link: "cybersecurity",
          image: "/images/cyber-security.jpg",
          title: "CyberSecurity",
          info: `Protect your data, devices, and privacy from cyber threats. Learn to identify risks, prevent attacks, and safeguard your online presence in an ever-changing digital landscape.`,
     },
     {
          icon: <Icons.TrendIcon key="11" />,
          name: "COURSE",
          link: "digital-marketing",
          image: "/images/search-engine-marketing.jpg",
          title: "Digital Marketing",
          info: `Reach the world with your message! Learn the strategies and tools to promote your business, product, or brand online. Master social media, search engines, and advertising to attract and engage customers.`,
     },
     {
          icon: <Icons.PaintbrushIcon key="5" />,
          name: " COURSE",
          link: "graphic-design",
          image: "/images/graphic-design.jpg",
          title: "Graphic Design",
          info: `Understand the secrets of color, layout, and typography to create eye-catching visuals that tell a story. Design logos, posters, and graphics that captivate and inspire.`,
     },
];
export const COURSE_OUTLINE: {
     title: string;
     textSnippet?: string;
     badgeType?:
          | "Engineering"
          | "Application"
          | "Business"
          | "Security"
          | "Technology"
          | "Design"
          | "default"
          | "secondary"
          | "destructive"
          | "outline"
          | null
          | undefined;
     tutorVideoUrl: string;
     tutorName: string;
     description: string;
     conclusion?: string;
     summary: string[];
     price: string;
     classes: string;
     classDays?: string[];
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
          title: "web-development",
          badgeType: "Engineering",
          textSnippet:
               "Take charge of your tech career with our {courseDetails.title} Crash Course!",
          tutorVideoUrl: "https://www.youtube.com/watch?v=yQ-kcn49r7s",
          tutorName: "Paul Ayobami",
          description: `You'll master the fundamental languages of the web (HTML, CSS, and JavaScript) and dive into React, a powerful tool for creating dynamic user interfaces. Learn to craft stunning layouts, bring your designs to life with interactive elements, and create responsive websites that look amazing on any device. No prior coding experience is required – just a passion for building awesome things on the web!`,
          summary: [
               `Web Fundamentals: Grasp the core building blocks of every website: HTML for structure, CSS for style, and JavaScript for interactivity.`,
               `React Essentials:Get introduced to React, the go-to library for crafting modern, component-based web applications. Build interactive UIs that are easy to maintain and scale.`,
               `Responsive Design knowledge: Learn to create websites that adapt seamlessly to different screen sizes, ensuring a great user experience on desktops, tablets, and mobile devices.`,
               `Dynamic Web Pages: Go beyond static content and build web pages that respond to user actions, update in real time, and deliver a truly engaging experience.`,
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: "Introduction to Web Development",
                    topics: [
                         { name: `What is web development?` },
                         { name: `Front-end vs. back-end development` },
                         { name: `Setting up your development environment` },
                    ],
               },
               {
                    title: "HTML (HyperText Markup Language)",
                    topics: [
                         { name: `Basic HTML tags and structure` },
                         {
                              name: `Creating elements, headings, paragraphs, lists, images, and links`,
                         },
                         { name: `Building simple web page layouts` },
                    ],
               },
               {
                    title: "CSS (Cascading Style Sheets)",
                    topics: [
                         {
                              name: `Styling HTML elements: colors, fonts, spacing, and backgrounds`,
                         },
                         {
                              name: `Creating responsive layouts with Flexbox or Grid`,
                         },
                         { name: `Basic CSS animations and transitions` },
                    ],
               },
               {
                    title: "JavaScript (JS)",
                    topics: [
                         { name: `Variables, data types, and operators` },
                         {
                              name: `Functions and conditional statements (if/else)`,
                         },
                         {
                              name: `DOM manipulation: interacting with HTML elements using JS`,
                         },
                    ],
               },
               {
                    title: "React Introduction",
                    topics: [
                         { name: `What is React?` },
                         { name: `Creating simple React components` },
                         { name: `Basic state management and rendering` },
                    ],
               },
          ],
          conclusion: `By the end of this crash course, you'll have a solid foundation in web development and the skills to start building your own amazing websites!`,
     },
     {
          title: "smart-home-automation",
          textSnippet:
               "Transform Your Home with our {courseDetails.title} Crash Course!",
          badgeType: "Technology",
          tutorVideoUrl: "/images/workspaces.webm",
          tutorName: "Temitope Paul-Bamidele",
          description: `Know the inner workings of smart-home automation in this captivating course! Let's show you the secrets of how devices communicate, store data, and orchestrate incredible experiences within your home. Get set to transform your living space with the power of automation!!`,
          summary: [
               `The ABCs of Smart Homes. You'll get a friendly introduction to the world of smart home automation, from the gadgets that make it happen to the amazing things you can do with it.`,
               `Know the control central behind the operation – smart hubs and controllers.You'll learn how they connect your devices and make your home truly smart.`,
               `Understand smart lighting – dim the lights for movie night, wake up to a sunrise glow, or set the mood with colorful scenes, all from your phone or with voice commands.`,
               `Keep your home safe and secure with smart security systems. Monitor cameras, lock doors remotely, and even receive alerts when someone's at your door.`,
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: "Basic Introduction",
                    topics: [
                         { name: "Introduction to smart home automation" },
                         { name: "Smart home hubs and controllers" },
                         { name: "Smart lighting" },
                         { name: "Smart security and surveillance systems" },
                         {
                              name: "Smart temperature and environmental control",
                         },
                         { name: "Smart  home entertainment" },
                    ],
               },
          ],
          conclusion: `By the end of this course, you'll be able to understand and navigate your way around smart home automation, ready to transform your living space into a futuristic haven of comfort, convenience, and control.`,
     },
     {
          title: "cybersecurity",
          textSnippet:
               "Become a Cyber Guardian with our {courseDetails.title} Crash Course.Your Essential Guide to Online Security",
          badgeType: "Security",
          tutorVideoUrl: "/videos/CyberSecurity.mp4",
          tutorName: "Temitope Paul-Bamidele",
          description: `Become a digital defender! Protect your online world from sneaky cyber villains. Learn how to safeguard your information, spot online scams, and keep your devices safe from harm.`,
          summary: [
               `Get a solid foundation in the essentials of cybersecurity.You'll understand the common threats, and why protecting your online world is crucial.`,
               `Know different types of cyber attacks – from sneaky viruses and malware to phishing scams and identity theft. Learn how hackers operate so you can stay one step ahead.`,
               `Master the fundamental security measures everyone should know. From how to create strong passwords, safeguarding your personal information, and protect your devices from harm.`,
               ` Dip your toes into the world of cryptography – the secret language of cybersecurity. Get a basic understanding of how encryption works and why it's so important for online security.`,
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: "Basic Introduction",
                    topics: [
                         { name: "Introduction to cybersecurity" },
                         { name: "Types of cyber threats" },
                         { name: "basic security measures" },
                         { name: "Basic crytography" },
                         { name: "Threat detection and response" },
                    ],
               },
          ],
          conclusion: `By the end of this course, you'll be equipped with the knowledge and tools to protect yourself in the digital world. You'll navigate the internet with confidence, knowing how to outsmart cyber villains and keep your information safe.`,
     },
     {
          title: "graphic-design",
          textSnippet:
               "From Doodles to Designs! Jumpstart Your Design Career with Our {courseDetails.title} Crash Course!",
          badgeType: "Design",
          tutorVideoUrl: "/videos/GraphicsDesign.mp4",
          tutorName: "Ezekiel Mahoussi",
          description: `Make your ideas come to life! Learn to design amazing logos, posters, and images that grab attention and tell your story. Express yourself through colors, shapes, and stunning visuals.`,
          summary: [
               ` Get a clear and concise introduction to the world of graphic design. You'll understand what it is, why it's important, and how it shapes our visual landscape.`,
               `key roles and responsibilities of a graphic designer. Learn about the different career paths available and the skills you'll need to succeed.`,
               `Get acquainted with the essential software and tools used by professional graphic designers. We'll cover industry standards like Adobe Photoshop and Illustrator, as well as other helpful resources.`,
               `Learn how to install and set up your design software, so you're ready to start creating from day one. We'll guide you through the process step-by-step.`,
               `Start your design journey by exploring the selection tool – your key to manipulating images and elements within your designs. This is the first step towards unleashing your creativity!`,
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: "Introduction to graphics design",
                    topics: [
                         { name: "Brief Explanation of graphics design" },
                         { name: "Roles of a graphics designer" },
                         { name: "Design tools and software" },
                         { name: "Installation" },
                    ],
               },
               {
                    title: "Vectors and Rasters",
                    topics: [
                         {
                              name: "Introduction to basic tools i.e selection tool ",
                         },
                         { name: "Understanding design principles" },
                         {
                              name: "Designing simple filers with minimal effects",
                         },
                         { name: "Redesigning popular logos and fliers" },
                    ],
               },
               {
                    title: "Interpretation of design",
                    topics: [
                         { name: "Creating color palette " },
                         { name: "Color psychology" },
                         { name: "Researching ideas" },
                         { name: "Class work" },
                    ],
               },
          ],
          conclusion: `By the end of this course, you'll have a clear understanding &  foundation in graphic design principles, software proficiency, and the confidence to start creating your own stunning visuals.`,
     },
     {
          title: "ui-ux-designing",
          textSnippet:
               "Design Digital Delights with our {courseDetails.title} Crash Course. A Practical Guide to UI/UX Fundamentals",
          badgeType: "Design",
          tutorVideoUrl: "/videos/UIDesign.mov",
          tutorName: "Mawuli Owusu Promise",
          description: `Learn how to make websites look beautiful and work smoothly! In this class, you'll discover the secrets to designing websites that people love to use. We'll cover the basics of website building and teach you how to create stylish layouts, eye-catching visuals, and simple navigation. Can't wait to see you in class. Register now lets build something magical.`,
          summary: [
               "Basic understanding on what UI/UX designing is all about.",
               `The magic behind user interface (UI) and user experience (UX) design. You'll understand why it's so important for creating websites and apps that people actually enjoy using.`,
               " Learn the secrets of user-centered design. Find out how to think like your target audience so you can build websites that cater to their needs and desires.",
               `Understand the fundamental principles of good UI design. Discover the best practices for creating intuitive interfaces that are both visually appealing and easy to navigate.`,
               "Tools for desinging and how to use them effectively in design.",
               "Understand visual design and how to implement them.",
               "How to conduct a user research.",
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weekss",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",

          curriculum: [
               {
                    title: "Basic Introduction",
                    topics: [
                         { name: "What is UX Design" },
                         {
                              name: "Importancce of UX design",
                         },
                         {
                              name: "User centered design",
                         },
                    ],
               },

               {
                    title: "Fundamentals of User Interface Design",
                    topics: [
                         { name: "What is UI design" },
                         {
                              name: "Best practices for UI design",
                         },
                         {
                              name: "Designing for mobile",
                         },
                    ],
               },
               {
                    title: "Introduction to design tools",
                    topics: [
                         { name: "Designing tools" },
                         {
                              name: "Getting started with Figma",
                         },
                    ],
               },
               {
                    title: "Visual Design fundamentals",
                    topics: [
                         { name: "Typography" },
                         {
                              name: "Color theory",
                         },
                         {
                              name: "Layout and composition",
                         },
                    ],
               },
               {
                    title: "User Research",
                    topics: [
                         { name: "Introduction to user research" },
                         {
                              name: "Creating user personas",
                         },
                         {
                              name: "User journey mapping",
                         },
                         {
                              name: "User testing and heuristics evaluation",
                         },
                    ],
               },
          ],
          conclusion: `By the end of this course, you'll have a solid fundamental foundation in UI/UX design and the confidence to start building your own amazing websites. Let's create some digital magic together!`,
     },
     {
          title: "mobile-app-development",
          textSnippet:
               "Build Your App-titude! A Hands-On {courseDetails.title} Crash Course for Aspiring Developers.",
          badgeType: "Application",
          tutorVideoUrl: "https://www.youtube.com/watch?v=4tnR5oR_4EM",
          tutorName: "David Sokeye",
          description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React to develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques.`,
          summary: [
               "Understand the basic concepts of mobile app development",
               "Navigate around the flutter world",
               "Basic setups of andriod using code editiors",
               "Ability to use  platforms specific widgets",
               "Know how to use state maintenance widgets",
               "Understand navigation routing and controllers in flutter",
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: "Basic Introduction",
                    topics: [
                         { name: "What is flutter?" },
                         {
                              name: "Advantages of using flutter for app development",
                         },
                         {
                              name: "Installation of code editior and flutter setup",
                         },
                         { name: "Installation of andriod studio and setups" },
                    ],
               },
               {
                    title: "Platform specific widgets",
                    topics: [
                         { name: "Scaffold " },
                         { name: "Textfield" },
                         { name: "Elevated buttons" },
                         { name: "App bar" },
                         { name: "Bottom navigation bar" },
                         { name: "floating action button" },
                    ],
               },
               {
                    title: "Platform independent widgets",
                    topics: [
                         { name: "Text widgets " },
                         { name: "Image widgets" },
                         { name: "Icon widgets" },
                         { name: "Form widgets" },
                    ],
               },
               {
                    title: "State maintenance widgets",
                    topics: [
                         { name: "Stateless widgets" },
                         { name: "Stateful widgets" },
                    ],
               },
               {
                    title: "Using single child layouts",
                    topics: [
                         { name: "Container" },
                         { name: "Center" },
                         { name: "Expended" },
                         { name: "Padding" },
                         { name: "Sixed box" },
                    ],
               },
          ],
          conclusion: `By the end of this course, you'll have the skills and confidence to bring your app ideas to life, whether you're building the next viral sensation or a handy tool for your own personal use.`,
     },
     {
          title: "digital-marketing",
          textSnippet:
               "Understand the Art of Online Influence with our {courseDetails.title} Crash Course!",
          badgeType: "Business",
          tutorVideoUrl: "/videos/DigitalMarketing.mp4",
          tutorName: "Emeka Ignatius",
          description: `Become a digital marketing whiz and learn how to take your message to the masses in this exciting, hands-on course. Reach the world with your message! Discover the exciting ways to promote products, ideas, or even yourself online. Learn how to use social media, create awesome ads, and attract fans and followers.Whether you're promoting a business, a product, a cause, or even yourself, this course will equip you with the tools you need to make a real impact online.`,
          summary: [
               `The Digital Marketing scopes: You'll get a clear overview of the digital marketing world, from social media platforms and search engines to email campaigns and paid advertising. Understand how each piece fits into a comprehensive strategy.`,
               `Social Media Superstar: You'll learn to harness the power of platforms like Facebook, Instagram, Twitter, and LinkedIn.How to create engaging content, build a loyal following, and drive traffic to your website or landing pages.`,
               `Explore the different types of digital advertising, understand targeting options, and measure your ad performance.`,
               `Discover how to create valuable content that attracts and delights your audience. Learn to write compelling blog posts, articles, and social media updates that resonate with your target market.`,
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: "Digital Marketing Fundamentals",
                    topics: [
                         {
                              name: "What is digital marketing and why is it essential?",
                         },
                         {
                              name: `The different channels and tactics of digital marketing`,
                         },
                         { name: `Developing a digital marketing strategy` },
                    ],
               },
               {
                    title: "Social Media Marketing",
                    topics: [
                         {
                              name: "Choosing the right platforms for your audience",
                         },
                         {
                              name: `Creating engaging content calendars`,
                         },
                         { name: `Running effective social media campaigns` },
                         { name: `Measuring social media success` },
                    ],
               },
               {
                    title: "Digital Advertising",
                    topics: [
                         {
                              name: "Understanding different ad formats (display, search, social, video)",
                         },
                    ],
               },
               {
                    title: "Content Marketing",
                    topics: [
                         {
                              name: "Identifying your target audience and their needs",
                         },
                         { name: "Creating a content strategy" },
                         { name: "Writing engaging and informative content" },
                         { name: "Distributing and promoting your content" },
                    ],
               },
          ],
          conclusion: `By the end of this course, you'll be equipped with the right digital marketing skills, ready to launch successful campaigns, grow your online presence, and achieve your marketing goals.`,
     },
     {
          title: "video-editing",
          badgeType: "Technology",
          textSnippet: `Learn How To Make & Edit Videos Like A Pro in 3 days: get jobs and start earning. With this {courseDetails.title} Crash Course!`,
          tutorVideoUrl: "/images/aboutsectionvideo.mp4",
          tutorName: "Anthony Nnamdi O.",
          description: `This intensive three-day crash course in video editing provides you with a comprehensive
	introduction to videography, the art and techniques of editing digital video content. Designed for
	beginners and aspiring YouTubers, content creator and editors, this course covers everything
	from the basics of editing software to advanced editing techniques, enabling students to create
	polished and professional looking videos.`,
          summary: [
               `How to make/shoot good video. (Basic Video Making Tips)`,
               `Proficiency in using a popular editing software such as Adobe Premiere Pro, Cap Cut, Film or
		a, Final Cut Pro, or DaVinci Resolve etc`,
               `Understanding of fundamental editing techniques such as cutting, trimming, and organizing
		footage on the timeline.`,
               `Mastery of intermediate editing skills including transitions, effects, audio manipulation, color
		correction, and titling.
		`,
               `Ability to apply advanced editing techniques such as graphics application and advanced
		transitions for creative storytelling.
		`,
               `Competence in exporting and rendering projects for various platforms, ensuring optimal
		playback quality and file size.`,
               `Confidence in producing professional-quality videos, whether for personal projects, social
		media content, or professional endeavors.`,
               `Bonus: Learn how to make or shoot a video
		(Basic Videography Tips)`,
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: " Introduction to Video Editing",
                    topics: [
                         { name: "Introduction to video editing software" },
                         {
                              name: `Overview of popular editing platforms (Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve
				etc)
				`,
                         },
                         {
                              name: `- Understanding the importance of editing in storytelling`,
                         },
                         { name: `Tour of the editing workspace` },
                         {
                              name: `Understanding the timeline, preview window, and tool panels`,
                         },
                         {
                              name: `Customizing the interface for efficient workflow`,
                         },
                         { name: `Importing media files into the project` },
                         { name: `Organizing footage in the project panel` },
                         {
                              name: `Creating bins and folders for efficient media management`,
                         },
                         {
                              name: `Cutting, trimming, and rearranging clips on the timeline`,
                         },
                         { name: `Using the razor tool for precise cuts` },
                         {
                              name: `Understanding the ripple and roll edit tools for seamless editing transitions`,
                         },
                    ],
               },
               {
                    title: "Intermediate Editing Techniques",
                    topics: [
                         {
                              name: `Adding transitions between clips for smooth visual flow`,
                         },
                         {
                              name: `Applying video and audio effects to enhance the footage`,
                         },
                         {
                              name: `Exploring preset effects and creating custom effects`,
                         },
                         {
                              name: `Adjusting audio levels and volume keyframes
			`,
                         },
                         {
                              name: `Adding music tracks and sound effects to enhance the audio experience`,
                         },
                         {
                              name: `Syncing audio with video clips for perfect timing`,
                         },
                         {
                              name: `Correcting color balance, exposure, and white balance issues`,
                         },
                         {
                              name: `- Applying color grading techniques to enhance the mood and tone of the footage`,
                         },
                         {
                              name: `Using color scopes and waveform monitors for precise color adjustments
			`,
                         },
                         {
                              name: `Creating and customizing text titles for video projects`,
                         },
                         {
                              name: `Adding lower thirds, overlays, and other graphic elements`,
                         },
                         {
                              name: `Animating text and graphics for dynamic visual effects`,
                         },
                    ],
               },
               {
                    title: "Advanced Editing and Project Completion",
                    topics: [
                         {
                              name: `Exploring advanced transition effects for creative storytelling
			`,
                         },
                         {
                              name: `Understanding export settings and formats for different platforms (YouTube, Vimeo, etc.)`,
                         },
                         {
                              name: `Rendering options for optimal playback quality and file size`,
                         },
                         {
                              name: `Exporting projects for final delivery and sharing`,
                         },
                         { name: `Reviewing participants' editing projects` },
                         {
                              name: `Providing constructive feedback and tips for improvement`,
                         },
                         {
                              name: `Addressing any questions or concerns from participants`,
                         },
                         {
                              name: `Assigning a final editing project to participants`,
                         },
                         {
                              name: `Participants work on their final projects with guidance and support`,
                         },
                         {
                              name: `- Reviewing and presenting final projects, celebrating achievements, and discussing next steps`,
                         },
                    ],
               },
          ],
          conclusion: `By the end of this course you must have learned how to make a video, mastered a video editing software, understand editing and moved from a novice or a beginner to a good video editor who edits polished and professional-looking videos.
`,
     },
     {
          title: `data-analytics`,
          textSnippet: ``,
          badgeType: "Technology",
          tutorVideoUrl: `/images/aboutsectionvideo.mp4`,
          tutorName: `Oziegbe Rapheal Ehimen`,
          description: ``,
          summary: [],
          price: `70,000/70,000`,
          classes: `3`,
          duration: `4 weeks`,
          numberOfStudentsErolled: `40`,
          language: `English`,
          certification: `Yes`,
          curriculum: [],
     },
     {
          title: "project-management",
          textSnippet:
               "Lead with Confidence! Conquer Project Chaos with Our {courseDetails.title} Crash Course",
          badgeType: "Business",
          tutorVideoUrl: "/images/aboutsectionvideo.mp4",
          tutorName: "Emmanuel Akhabue",
          description: `Be the ultimate organizer! Master the skills to lead projects from start to finish. Learn to set goals, manage timelines, and keep your team on track for success. It's like being the boss of your own adventure!`,
          summary: [
               "Define key project management concepts and terminology.",
               "Understand the project life cycle.",
               "Develop essential project management skills: planning, scheduling, budgeting, and risk management.",
               "Apply effective communication and stakeholder management techniques.",
          ],
          price: "70,000/70,000",
          classes: "12",
          duration: "4 weeks",
          numberOfStudentsErolled: "40",
          language: "English",
          certification: "Yes",
          curriculum: [
               {
                    title: " Introduction to Project Management",
                    topics: [
                         { name: "What is project management?" },
                         { name: `Project vs. Operations` },
                         { name: `Benefits of effective project management` },
                         { name: `Key project management terminology` },
                    ],
               },
               {
                    title: "Project Life Cycle",
                    topics: [
                         {
                              name: "Phases of a project (Initiation, Planning, Execution, Monitoring & Control, Closing)",
                         },
                         { name: `Deliverables and activities at each stage` },
                         {
                              name: `Project lifecycle models (e.g., Waterfall, Agile)`,
                         },
                    ],
               },
               {
                    title: "Project Planning",
                    topics: [
                         {
                              name: "Defining project scope (Work Breakdown Structure - WBS)",
                         },
                         { name: ` Developing a communication plan` },
                         { name: `Creating a project charter` },
                    ],
               },
               {
                    title: "Project Risk Management",
                    topics: [
                         { name: "Identifying potential project risks)" },
                         { name: `  Assessing risk probability and impact` },
                         {
                              name: `Monitoring and managing risks throughout the project`,
                         },
                    ],
               },
          ],
          conclusion: `By the end of this crash course, you'll be equipped with the essential project management knowledge and tools to successfully initiate, plan, execute, and close projects of varying complexities. `,
     },
];

export const TUTOR_PROFILE: {
     name: string;
     about: string;
     role: string;
     image: StaticImport | string;
}[] = [
     {
          name: "Paul Ayobami",
          role: "Senior frontend Developer",
          about: `Senior front-end developer with years of expertise crafting exceptional user experiences and building robust, scalable web applications. Proven track record of leading development teams, implementing cutting-edge technologies, and delivering high-quality products that exceed user expectations. Passionate about creating intuitive, visually appealing, and high-performing user interfaces that delight users and drive business results.`,
          image: "/images/paul.jpg",
     },
     {
          name: "Ezekiel Mahoussi",
          role: "Graphic Designer",
          about: `I am a visual storyteller, strategist and graphic designer, I create problem solving designs with a streamlined process using various design tools.`,
          image: "/images/ezekiel.jpg",
     },
     {
          name: "Mawuli Owusu Promise",
          role: "Design Expert",
          about: `I am an innovative designer who is passionate about creativity and functional user centric products. I believe that a well-crafted interface should feel like a calm guided journey rather than a chaotic maze. I am experienced in designing experiences for web and mobile applications, as well as rebranding and redesigning experiences. I have previously worked on applications that have relevance in transportation, E-commerce, FinTech and health sector.`,
          image: "/images/wuli.jpg",
     },
     {
          name: "Temitope Paul-Bamidele",
          role: "Cyber Expert",
          about: `Highly experienced cybersecurity analyst with  years of expertise in protecting digital assets from cyber threats. Proven track record of developing and implementing comprehensive security strategies, conducting penetration testing, and incident response. Skilled in threat analysis, vulnerability assessment, and security architecture. Proficient in industry-leading tools and technologies, including firewalls, intrusion detection systems, and encryption protocols.`,
          image: "/images/tems.jpg",
     },
     {
          name: "Temitope Paul-Bamidele",
          role: "Home Expert",
          about: `Highly experienced cybersecurity analyst with  years of expertise in protecting digital assets from cyber threats. Proven track record of developing and implementing comprehensive security strategies, conducting penetration testing, and incident response. Skilled in threat analysis, vulnerability assessment, and security architecture. Proficient in industry-leading tools and technologies, including firewalls, intrusion detection systems, and encryption protocols.`,
          image: "/images/tems.jpg",
     },
     {
          name: "Emmanuel Akhabue",
          role: "Project manager",
          about: `I thrive on leading teams and projects to successful outcomes. Proficient in utilizing various project management methodologies, including Agile and Waterfall, adapting my approach to suit the specific needs of each project.`,
          image: "/images/emma.jpg",
     },
     {
          name: "David Sokeye",
          role: "Flutter & Dart Developer",
          about: `Proficient in Dart programming language and Flutter framework Strong knowledge of object-oriented programming (OOP) principles Experience in developing and implementing UI/UX designs Expertise in integrating RESTful APIs`,
          image: "/images/david.jpg",
     },
     {
          name: "Emeka Ignatius",
          role: "Digital Specialist",
          about: `Creative Digital Marketer specializing in crafting compelling content that connects with audiences and drives engagement. Experienced in developing content strategies, writing engaging, and optimizing content for SEO. Adept at social media storytelling and managing online communities.Passionate about leveraging digital tools and trends to promote brands and achieve measurable growth.`,
          image: "/images/emeka.jpg",
     },
     {
          name: "Anthony Nnamdi O.",
          role: "Content Creator",
          about: `Anthony Nnamdi is a digital/visual content consultant and creator with vast knowledge and experience in Media/Tech. Specialises on Videography/Video Editing, Photography/Retouching, Graphics Design/UI/UX, Social Media Marketing, I have worked with a number of individual brands, startups and companies (Real Estate, Tech, Beverage, Cosmetic, logistics, FX etc). I am ever ready to share my years of experience and to teach students or anyone who is intrested or ready to start a career in the media space.`,
          image: "/images/anthony.jpg",
     },
];
export const TESTIMONIALS: {
     image?: StaticImport | string;
     name: string;
     review: string;
     userrole: string;
}[] = [
     {
          image: "/images/lekan.jpg",
          name: "Lekan John",
          review: `I would not have gotten ready for a web developer position if I hadn't attended the PalmTechnIQ courses. I strongly recommend you try a course with them.`,
          userrole: "Frontend Developer",
     },
     {
          image: "/images/tobe.jpg",
          name: "Tobechukwu P.",
          review: `What I gained from the course was the ability to better understand coding and how to work better on a project. Just an amazing place to start your tech career.`,
          userrole: "Frontend Developer",
     },
     {
          image: "/images/favour.jpg",
          name: "Favour Mbegbu",
          review: `I highly recommend PalmTechnIQ to anyone looking to learn a beginner friendly course. This is where you go from beginner to PRO`,
          userrole: "Social media manager",
     },
];
export const FREQUENTLY_ASKED_QUESTIONS: {
     question: string;
     answer: string;
}[] = [
     {
          question: "What is PalmtechnIQ?",
          answer: "PalmtechnIQ is an online educational platform that offers a wide range of courses and resources in various fields such as technology, business, arts, and more. Our mission is to provide accessible and high-quality education to learners worldwide.",
     },
     {
          question: "How does PalmtechnIQ work?",
          answer: "To get started with PalmtechnIQ, simply create an account on our website or mobile app. Browse through our course catalog, enroll in your preferred courses, and start learning at your own pace. Our platform offers interactive lessons, quizzes, projects, and discussions to enhance your learning experience.",
     },
     {
          question: "What types of courses does PalmtechnIQ offer?",
          answer: "We offer courses in diverse subjects, including programming, web development, data science, graphic design, entrepreneurship, and many more. Our courses are designed by industry experts and updated regularly to ensure relevance and quality.",
     },
     {
          question: "Are the courses on PalmtechnIQ self-paced?",
          answer: "Yes! most of our courses are self-paced, allowing you to learn at a time and place that suits you. You can progress through the lessons and complete assignments at your own speed, with no deadlines or fixed schedules.",
     },
     {
          question: "Can I access PalmtechnIQ courses on mobile devices?",
          answer: " Yes! PalmtechnIQ is accessible on both desktop and mobile devices. You can download our mobile app from the App Store or Google Play Store to access courses and continue learning on the go.",
     },
     {
          question: "How much do PalmtechnIQ courses cost?",
          answer: "While some courses on PalmtechnIQ are free, others may require payment. The cost of courses varies depending on factors such as course duration, complexity, and instructor expertise. We also offer discounts and promotions from time to time.",
     },
     {
          question: "Can I get a certificate upon completing a course?",
          answer: "Yes! upon successfully completing a course on PalmtechnIQ, you will receive a certificate of completion. Certificates can be shared on your LinkedIn profile or included in your resume to showcase your skills and achievements.",
     },
];
export const PRIVACY_POLICY: {
     title?: string;
     information: string;
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
          link: "contact",
     },
     {
          information: `If you have any questions or concerns about this Privacy Policy or our
        privacy practices please contact us at [Contact Information]. By using
        our Services you consent to the collection use and sharing of your
        information as described in this Privacy Policy.`,
     },
];

export const SIDEBAR_LINKS_STUDENT = [
     {
          name: "Dashboard",
          link: "/student",
          icon: BookOpenIcon,
     },
     {
          name: "My Courses",
          link: "/student/courses",
          icon: BookOpenIcon,
     },
     {
          name: "Mentorship",
          link: "/mentorship",
          icon: CalendarIcon,
     },
     {
          name: "Progress",
          link: "/student/progress",
          icon: BarChartIcon,
     },
     {
          name: "Profile",
          link: "/student/profile",
          icon: UserCircleIcon,
     },
];

export const SIDEBAR_LINKS_TUTOR = [
     {
          name: "Dashboard",
          link: "/tutor",
          icon: HomeIcon,
     },
     {
          name: "Courses",
          link: "/tutor/courses",
          icon: BookOpenIcon,
     },
     {
          name: "Mentorships",
          link: "/tutor/mentorships",
          icon: CalendarIcon,
     },
     {
          name: "Assignments",
          link: "/tutor/assignments",
          icon: FileTextIcon,
     },
     {
          name: "Profile",
          link: "/tutor/profile",
          icon: UserCircleIcon,
     },
     {
          name: "Wallet",
          link: "/tutor/wallet",
          icon: WalletIcon,
     },
];
export const SIDEBAR_LINKS_ADMIN = [
     {
          name: "Dashboard",
          link: "/admin",
          icon: HomeIcon,
     },
     // {
     // 	name: 'Users',
     // 	link: '/users',
     // 	icon:  UserGroupIcon
     // },
     {
          name: "Courses",
          link: "/admin/courses",
          icon: BookOpenIcon,
     },
     {
          name: "Students",
          link: "/admin/students",
          icon: UsersIcon,
     },
     {
          name: "Tutors",
          link: "/admin/tutors",
          icon: UsersIcon,
     },
];

export const DOCS_LINKS = [
     { name: "Introduction", href: "/docs" },
     { name: "Installation", href: "/docs/installation" },
     { name: "Features", href: "/docs/features" },
     { name: "API", href: "/docs/api" },
     { name: "Contributing", href: "/docs/contributing" },
     { name: "Changelog", href: "/docs/changelog" },
];

export const INDUSTRIES = [
     "Cybersecurity",
     "UI/UX Design",
     "Product Management",
     "Software Engineering",
];

export const FAKE_INDUSTRIES = [
     "Security",
     "Design",
     "Product",
     "Engineering",
     "Marketing",
     "Finance",
     "Healthcare",
];

export const FAKE_REGISTRANTS = [
     { name: "Chukwuma Okeke", role: "Security Analyst" },
     { name: "Aisha Ibrahim", role: "UX Designer" },
     { name: "Olumide Adebayo", role: "Product Manager" },
     { name: "Fatima Yusuf", role: "Software Engineer" },
     { name: "Emeka Nwosu", role: "Cybersecurity Specialist" },
     { name: "Ngozi Eze", role: "UI Designer" },
     { name: "Tunde Adeyemi", role: "Product Lead" },
     { name: "Amaka Okafor", role: "DevOps Engineer" },
     { name: "Ifeanyi Chukwu", role: "Security Consultant" },
     { name: "Zainab Bello", role: "Graphic Designer" },
     { name: "Kehinde Ogunleye", role: "Product Strategist" },
     { name: "Chidinma Obi", role: "Frontend Developer" },
     { name: "Abdullahi Musa", role: "Network Engineer" },
     { name: "Funmilayo Adekunle", role: "UX Researcher" },
     { name: "Oluwaseun Adewale", role: "Product Owner" },
     { name: "Chiamaka Nnadi", role: "Backend Developer" },
     { name: "Sani Mohammed", role: "Security Engineer" },
     { name: "Adanna Okonkwo", role: "Interaction Designer" },
     { name: "Babatunde Lawal", role: "Agile Coach" },
     { name: "Hauwa Idris", role: "Full Stack Developer" },
     { name: "Chukwudi Nnamdi", role: "Penetration Tester" },
     { name: "Omolola Shittu", role: "Visual Designer" },
     { name: "Adebola Ojo", role: "Product Analyst" },
     { name: "Nkechi Umeh", role: "Cloud Engineer" },
     { name: "Yusuf Abubakar", role: "Security Architect" },
     { name: "Chioma Ekeh", role: "UI/UX Designer" },
     { name: "Oladapo Fashola", role: "Product Marketing Manager" },
     { name: "Khadija Suleiman", role: "Mobile Developer" },
     { name: "Obinna Igwe", role: "Incident Responder" },
     { name: "Temilade Ogunrinde", role: "Motion Designer" },
     { name: "Mustapha Danjuma", role: "Product Designer" },
     { name: "Ebere Nwachukwu", role: "Data Engineer" },
     { name: "Segun Adesina", role: "Security Operations" },
     { name: "Ifunanya Okoye", role: "UX Strategist" },
     { name: "Ahmed Sani", role: "Product Consultant" },
     { name: "Chinelo Anigbogu", role: "API Developer" },
     { name: "Temitope Balogun", role: "Threat Analyst" },
     { name: "Rukayat Aliyu", role: "Web Designer" },
     { name: "Chigozie Udeh", role: "Product Operations" },
     { name: "Amarachi Nwankwo", role: "Machine Learning Engineer" },
     { name: "Ibrahim Shehu", role: "Security Auditor" },
     { name: "Opeyemi Afolabi", role: "UX Analyst" },
     { name: "Chukwuebuka Okoro", role: "Product Specialist" },
     { name: "Halima Garba", role: "Database Engineer" },
     { name: "Oluwatobi Oni", role: "Security Manager" },
     { name: "Adaeze Mbanefo", role: "Interface Designer" },
     { name: "Suleiman Abdullahi", role: "Product Growth Manager" },
     { name: "Nkiruka Ogbodo", role: "AI Engineer" },
     { name: "Femi Adeyinka", role: "Security Advisor" },
     { name: "Uchechi Onyema", role: "Prototyping Specialist" },
];

export const SPEAKERS = [
     {
          name: " Ikechukwu Samuel",
          title: "CEO SchooWare",
          image: "/event_speakers/speaker_sam.jpg",
          topic: "From curiosity to code: My journey into Tech and the Rise of AI.",
     },
     {
          name: "Solomon Ogege",
          title: "Founder CEO AXAO",
          image: "/event_speakers/speaker_solomon.png",
          topic: "Beyond the hype: Real world application of emerging technologies for societal impact",
     },
     // {
     //      name: "Mahoussi Ezekiel",
     //      title: "Product Strategy Lead",
     //      image: "/event_speakers/speaker_ezekiel.jpg",
     //      topic: "Cut product development cycles by 70% using AI forecasting",
     // },
];

export const EVENT_TESTIMONIALS = [
     {
          quote: "Went from fearing AI to commanding it. Now saving 15 hours/week on security audits.",
          author: "Sam R., Security Analyst",
          result: "300% threat detection boost",
     },
     {
          quote: "AI didn't replace me - it made me 10x more valuable. Promoted within 3 months of applying these techniques.",
          author: "Lisa T., Product Manager",
          result: "Promoted to Director",
     },
     {
          quote: "Automated my boring tasks in 2 days. Now I focus on creative solutions that get me noticed.",
          author: "Marcus L., UX Designer",
          result: "Raise + recognition",
     },
];
export const AGENDA = [
     {
          title: "Explore Real-World AI Applications",
          description:
               "You will see how AI is solving everyday problems the Naija way.",
          highlight: true,
     },
     {
          title: "Network with Innovators & Industry Leaders",
          description:
               "You will connect with tech founders, creatives, and future collaborators.",
          highlight: true,
     },
     {
          title: "Access Exclusive Growth Opportunities",
          description:
               "Discover jobs, partnerships, and funding leads just by showing up.",
          highlight: false,
     },
     {
          title: "Be Part of a Tech Movement Built for Us",
          description:
               "Celebrate Nigerian talent and join the community shaping our digital",
          highlight: false,
     },
];
// export const DEFAULT_TUTOR: Omit<User, 'id'>[] = [
// 	{
// 		name: 'Paul Ayobami',
// 		description: `Senior front-end developer with years of expertise crafting exceptional user experiences and building robust, scalable web applications. Proven track record of leading development teams, implementing cutting-edge technologies, and delivering high-quality products that exceed user expectations. Passionate about creating intuitive, visually appealing, and high-performing user interfaces that delight users and drive business results.`,
// 		email: 'ap.oyenran@gmail.com',
// 		position: 'Senior frontend Developer',
// 		emailVerified: new Date(),
// 		image: '/images/paul.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// 	{
// 		name: 'Ezekiel Mahoussi',
// 		description: `I am a visual storyteller, strategist and graphic designer, I create problem solving designs with a streamlined process using various design tools.`,
// 		email: 'designbyeasy@gmail.com',
// 		position: 'Graphic Designer',
// 		emailVerified: new Date(),
// 		image: '/images/ezekiel.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// 	{
// 		name: 'Mawuli Owusu Promise',
// 		description: `I am an innovative designer who is passionate about creativity and functional user centric products. I believe that a well-crafted interface should feel like a calm guided journey rather than a chaotic maze. I am experienced in designing experiences for web and mobile applications, as well as rebranding and redesigning experiences. I have previously worked on applications that have relevance in transportation, E-commerce, FinTech and health sector.`,
// 		email: 'mawuliowusu@gmail.com',
// 		position: 'Design Expert',
// 		emailVerified: new Date(),
// 		image: '/images/wuli.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// 	{
// 		name: 'Temitope Paul-Bamidele',
// 		description: `Highly experienced cybersecurity analyst with  years of expertise in protecting digital assets from cyber threats. Proven track record of developing and implementing comprehensive security strategies, conducting penetration testing, and incident response. Skilled in threat analysis, vulnerability assessment, and security architecture. Proficient in industry-leading tools and technologies, including firewalls, intrusion detection systems, and encryption protocols.`,
// 		email: 'Topsyshieldsolutions@gmail.com',
// 		position: 'Cyber Expert/Home Expert',
// 		emailVerified: new Date(),
// 		image: '/images/tems.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// 	{
// 		name: 'Emmanuel Akhabue',
// 		description: `I thrive on leading teams and projects to successful outcomes. Proficient in utilizing various project management methodologies, including Agile and Waterfall, adapting my approach to suit the specific needs of each project.`,
// 		email: 'eoziegbe2@gmail.com',
// 		position: 'Project manager',
// 		emailVerified: new Date(),
// 		image: '/images/emma.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// 	{
// 		name: 'David Sokeye',
// 		description: `Proficient in Dart programming language and Flutter framework Strong knowledge of object-oriented programming (OOP) principles Experience in developing and implementing UI/UX designs Expertise in integrating RESTful APIs`,
// 		email: 'oladimejidavid91@gmail.com',
// 		position: 'Flutter & Dart Developer',
// 		emailVerified: new Date(),
// 		image: '/images/david.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// 	{
// 		name: 'Emeka Ignatius',
// 		description: `Creative Digital Marketer specializing in crafting compelling content that connects with audiences and drives engagement. Experienced in developing content strategies, writing engaging, and optimizing content for SEO. Adept at social media storytelling and managing online communities.Passionate about leveraging digital tools and trends to promote brands and achieve measurable growth.`,
// 		email: 'emekaignatius5@gmail.com',
// 		position: 'Digital Specialist',
// 		emailVerified: new Date(),
// 		image: '/images/emeka.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// 	{
// 		name: 'Anthony Nnamdi O.',
// 		description: `Anthony Nnamdi is a digital/visual content consultant and creator with vast knowledge and experience in Media/Tech. Specialises on Videography/Video Editing, Photography/Retouching, Graphics Design/UI/UX, Social Media Marketing, I have worked with a number of individual brands, startups and companies (Real Estate, Tech, Beverage, Cosmetic, logistics, FX etc). I am ever ready to share my years of experience and to teach students or anyone who is intrested or ready to start a career in the media space.`,
// 		email: 'imusttalkmedia@gmail.com',
// 		position: 'Content Creator',
// 		emailVerified: new Date(),
// 		image: '/images/anthony.jpg',
// 		password: '',
// 		phone: '',
// 		role: 'TUTOR'
// 	},
// ]

// export const DEFAULT_COURSE: Omit<Course, 'id'> [] =
// [
// 	{
// 		title: `web-development`,
// 		category: `Engineering`,
// 		textSnippet:  'Take charge of your tech career with our {courseDetails.title} Crash Course!',
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwtk0000nv128b2kh5zy`,
// 		description: `You'll master the fundamental languages of the web (HTML, CSS, and JavaScript) and dive into React, a powerful tool for creating dynamic user interfaces. Learn to craft stunning layouts, bring your designs to life with interactive elements, and create responsive websites that look amazing on any device. No prior coding experience is required – just a passion for building awesome things on the web!`,
// 		conclusion: `By the end of this crash course, you'll have a solid foundation in web development and the skills to start building your own amazing websites!`,
// 		summary: `Web Fundamentals: Grasp the core building blocks of every website: HTML for structure, CSS for style, and JavaScript for interactivity.---React Essentials:Get introduced to React, the go-to library for crafting modern, component-based web applications. Build interactive UIs that are easy to maintain and scale.---Responsive Design knowledge: Learn to create websites that adapt seamlessly to different screen sizes, ensuring a great user experience on desktops, tablets, and mobile devices.---Dynamic Web Pages: Go beyond static content and build web pages that respond to user actions, update in real time, and deliver a truly engaging experience.`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `smart-home-automation`,
// 		category: `Technology`,
// 		textSnippet: 'Transform Your Home with our {courseDetails.title} Crash Course!',
// 		videoUrl: `/images/workspaces.webm`,
// 		tutorId: `clxdcdwu70003nv12vdw09or9`,
// 		description: `Know the inner workings of smart-home automation in this captivating course! Let's show you the secrets of how devices communicate, store data, and orchestrate incredible experiences within your home. Get set to transform your living space with the power of automation!!`,
// 		conclusion: `By the end of this course, you'll be able to understand and navigate your way around smart home automation, ready to transform your living space into a futuristic haven of comfort, convenience, and control.`,
// 		summary: `The ABCs of Smart Homes. You'll get a friendly introduction to the world of smart home automation, from the gadgets that make it happen to the amazing things you can do with it.---Know the control central behind the operation – smart hubs and controllers.You'll learn how they connect your devices and make your home truly smart.---Understand smart lighting – dim the lights for movie night, wake up to a sunrise glow, or set the mood with colorful scenes, all from your phone or with voice commands.---Keep your home safe and secure with smart security systems. Monitor cameras, lock doors remotely, and even receive alerts when someone's at your door.`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `cybersecurity`,
// 		category: `Security`,
// 		textSnippet: 'Become a Cyber Guardian with our {courseDetails.title} Crash Course.Your Essential Guide to Online Security',
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwu70003nv12vdw09or9`,
// 		description: `Become a digital defender! Protect your online world from sneaky cyber villains. Learn how to safeguard your information, spot online scams, and keep your devices safe from harm.`,
// 		conclusion: `By the end of this course, you'll be equipped with the knowledge and tools to protect yourself in the digital world. You'll navigate the internet with confidence, knowing how to outsmart cyber villains and keep your information safe.`,
// 		summary: `Get a solid foundation in the essentials of cybersecurity.You'll understand the common threats, and why protecting your online world is crucial.---Know different types of cyber attacks – from sneaky viruses and malware to phishing scams and identity theft. Learn how hackers operate so you can stay one step ahead.---Master the fundamental security measures everyone should know. From how to create strong passwords, safeguarding your personal information, and protect your devices from harm.---Dip your toes into the world of cryptography – the secret language of cybersecurity. Get a basic understanding of how encryption works and why it's so important for online security.`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `graphic-design`,
// 		category: `Design`,
// 		textSnippet: 'From Doodles to Designs! Jumpstart Your Design Career with Our {courseDetails.title} Crash Course!',
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwu70001nv12aibqdyh4`,
// 		description: `Make your ideas come to life! Learn to design amazing logos, posters, and images that grab attention and tell your story. Express yourself through colors, shapes, and stunning visuals.`,
// 		conclusion: `By the end of this course, you'll have a clear understanding &  foundation in graphic design principles, software proficiency, and the confidence to start creating your own stunning visuals.`,
// 		summary: `Get a clear and concise introduction to the world of graphic design. You'll understand what it is, why it's important, and how it shapes our visual landscape.---key roles and responsibilities of a graphic designer. Learn about the different career paths available and the skills you'll need to succeed.---Get acquainted with the essential software and tools used by professional graphic designers. We'll cover industry standards like Adobe Photoshop and Illustrator, as well as other helpful resources.---Learn how to install and set up your design software, so you're ready to start creating from day one. We'll guide you through the process step-by-step.---Start your design journey by exploring the selection tool – your key to manipulating images and elements within your designs. This is the first step towards unleashing your creativity!`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `ui-ux-designing`,
// 		category: `Design`,
// 		textSnippet: 'Design Digital Delights with our {courseDetails.title} Crash Course. A Practical Guide to UI/UX Fundamentals',
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwu70002nv12r7mcbzki`,
// 		description: `Learn how to make websites look beautiful and work smoothly! In this class, you'll discover the secrets to designing websites that people love to use. We'll cover the basics of website building and teach you how to create stylish layouts, eye-catching visuals, and simple navigation. Can't wait to see you in class. Register now lets build something magical.`,
// 		conclusion: `By the end of this course, you'll have a solid fundamental foundation in UI/UX design and the confidence to start building your own amazing websites. Let's create some digital magic together!`,
// 		summary: `Basic understanding on what UI/UX designing is all about.---The magic behind user interface (UI) and user experience (UX) design. You'll understand why it's so important for creating websites and apps that people actually enjoy using.---Learn the secrets of user-centered design. Find out how to think like your target audience so you can build websites that cater to their needs and desires.---Understand the fundamental principles of good UI design. Discover the best practices for creating intuitive interfaces that are both visually appealing and easy to navigate.---Tools for desinging and how to use them effectively in design.---Understand visual design and how to implement them.---How to conduct a user research.`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `mobile-app-development`,
// 		category: `Application`,
// 		textSnippet: 'Build Your App-titude! A Hands-On {courseDetails.title} Crash Course for Aspiring Developers.',
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwu70005nv12rh9d7480`,
// 		description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques. `,
// 		conclusion: `By the end of this course, you'll have the skills and confidence to bring your app ideas to life, whether you're building the next viral sensation or a handy tool for your own personal use.`,
// 		summary: `Understand the basic concepts of mobile app development---Navigate around the flutter world---Basic setups of andriod using code editiors---Ability to use  platforms specific widgets---Know how to use state maintenance widgets---Understand navigation routing and controllers in flutter`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `digital-marketing`,
// 		category: `Business`,
// 		textSnippet: 'Understand the Art of Online Influence with our {courseDetails.title} Crash Course!',
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwu80006nv12j7dx8rzj`,
// 		description: `Become a digital marketing whiz and learn how to take your message to the masses in this exciting, hands-on course. Reach the world with your message! Discover the exciting ways to promote products, ideas, or even yourself online. Learn how to use social media, create awesome ads, and attract fans and followers.Whether you're promoting a business, a product, a cause, or even yourself, this course will equip you with the tools you need to make a real impact online.`,
// 		conclusion: `By the end of this course, you'll be equipped with the right digital marketing skills, ready to launch successful campaigns, grow your online presence, and achieve your marketing goals.`,
// 		summary: `The Digital Marketing scopes: You'll get a clear overview of the digital marketing world, from social media platforms and search engines to email campaigns and paid advertising. Understand how each piece fits into a comprehensive strategy.---Social Media Superstar: You'll learn to harness the power of platforms like Facebook, Instagram, Twitter, and LinkedIn.How to create engaging content, build a loyal following, and drive traffic to your website or landing pages.---Explore the different types of digital advertising, understand targeting options, and measure your ad performance.---Discover how to create valuable content that attracts and delights your audience. Learn to write compelling blog posts, articles, and social media updates that resonate with your target market.`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `video-editing`,
// 		category: `Technology`,
// 		textSnippet:  `Learn How To Make & Edit Videos Like A Pro in 3 days: get jobs and start earning. With this {courseDetails.title} Crash Course!`,
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwu80007nv12lihkxc2q`,
// 		description: `This intensive three-day crash course in video editing provides you with a comprehensi`,
// 		conclusion: `By the end of this course you must have learned how to make a video, mastered a video editing software, understand editing and moved from a novice or a beginner to a good video editor who edits polished and professional-looking video`,
// 		summary: `How to make/shoot good video. (Basic Video Making Tips)---Proficiency in using a popular editing software such as Adobe Premiere Pro, Cap Cut, Film or
// 		a, Final Cut Pro, or DaVinci Resolve etc---Understanding of fundamental editing techniques such as cutting, trimming, and organizing
// 		footage on the timeline.---Mastery of intermediate editing skills including transitions, effects, audio manipulation, color
// 		correction, and titling.---Ability to apply advanced editing techniques such as graphics application and advanced
// 		transitions for creative storytelling.---Competence in exporting and rendering projects for various platforms, ensuring optimal
// 		playback quality and file size.---Confidence in producing professional-quality videos, whether for personal projects, social
// 		media content, or professional endeavors.---Bonus: Learn how to make or shoot a video
// 		(Basic Videography Tips)`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// 	{
// 		title: `project-management`,
// 		category: `Business`,
// 		textSnippet: 'Lead with Confidence! Conquer Project Chaos with Our {courseDetails.title} Crash Course',
// 		videoUrl: `/images/aboutsectionvideo.mp4`,
// 		tutorId: `clxdcdwu70004nv12q52dirjx`,
// 		description: `Be the ultimate organizer! Master the skills to lead projects from start to finish. Learn to set goals, manage timelines, and keep your team on track for success. It's like being the boss of your own adventure!`,
// 		conclusion: `By the end of this crash course, you'll be equipped with the essential project management knowledge and tools to successfully initiate, plan, execute, and close projects of varying complexities. `,
// 		summary: `Define key project management concepts and terminology.---Understand the project life cycle.---Develop essential project management skills: planning, scheduling, budgeting, and risk management.---Apply effective communication and stakeholder management techniques.`,
// 		virtualPrice: 30000,
// 		physicalPrice: 50000 ,
// 		noOfClass: `3`,
// 		classDays: `Monday---Wednesday---Friday`,
// 		duration: `6 hrs`,
// 		certificate: true,
// 	},
// ]

// export const CURRICULUM: Omit<Curriculum, 'id'>[] = [
// 	{
// 		courseId: 'clxdf9wva000032yne2crrdzx',
// 		headingNumber: '1',
// 		headingName: 'Introduction to Web Development',
// 		headingDescription: `What is web development?---Front-end vs. back-end development---Setting up your development environment`,
// 	},
// 	{
// 		courseId: 'clxdf9wva000032yne2crrdzx',
// 		headingNumber: '2',
// 		headingName: 'HTML (HyperText Markup Language)',
// 		headingDescription: `Basic HTML tags and structure---Creating elements, headings, paragraphs, lists, images, and links---Building simple web page layouts`,
// 	},
// 	{
// 		courseId: 'clxdf9wva000032yne2crrdzx',
// 		headingNumber: '3',
// 		headingName: 'CSS (Cascading Style Sheets)',
// 		headingDescription: `Styling HTML elements: colors, fonts, spacing, and backgrounds---Creating responsive layouts with Flexbox or Grid---Basic CSS animations and transitions`,
// 	},
// 	{
// 		courseId: 'clxdf9wva000032yne2crrdzx',
// 		headingNumber: '4',
// 		headingName: 'JavaScript (JS)',
// 		headingDescription: `Variables, data types, and operators---Functions and conditional statements (if/else)---DOM manipulation: interacting with HTML elements using JS`,
// 	},
// 	{
// 		courseId: 'clxdf9wva000032yne2crrdzx',
// 		headingNumber: '5',
// 		headingName: 'React Introduction',
// 		headingDescription: `What is React?---Creating simple React components---Basic state management and rendering`,
// 	},

// 	{
// 		courseId: 'clxdf9wwr000132yn7qfdpp7e',
// 		headingNumber: '1',
// 		headingName: 'Basic Introduction',
// 		headingDescription: `Introduction to smart home automation---Smart home hubs and controllers---Smart lighting---Smart security and surveillance systems---Smart temperature and environmental control---Smart  home entertainment`,
// 	},
// 	{
// 		courseId: 'clxdf9wwr000232yn2nwtc1wq',
// 		headingNumber: '1',
// 		headingName: 'Basic Introduction',
// 		headingDescription: `Introduction to cybersecurity---Types of cyber threats---basic security measure---Basic crytography---Threat detection and response`,
// 	},

// 	{
// 		courseId: 'clxdf9wwr000332ynkke3keaj',
// 		headingNumber: '1',
// 		headingName: 'Introduction to graphics design',
// 		headingDescription: `Brief Explanation of graphics design---Roles of a graphics designer---Design tools and software---Installation`,
// 	},
// 	{
// 		courseId: 'clxdf9wwr000332ynkke3keaj',
// 		headingNumber: '2',
// 		headingName: 'Vectors and Rasters',
// 		headingDescription: `Introduction to basic tools i.e selection tool---Understanding design principles---Designing simple filers with minimal effects---Redesigning popular logos and fliers`,
// 	},
// 	{
// 		courseId: 'clxdf9wwr000332ynkke3keaj',
// 		headingNumber: '3',
// 		headingName: 'Interpretation of design',
// 		headingDescription: `Creating color palette---Color psychology---Researching ideas---Class work`,
// 	},

// 	//UI/UX DESIGN
// 	{
// 		courseId: 'clxdf9wwr000432yns7u7yzfe',
// 		headingNumber: '1',
// 		headingName: 'Basic Introduction',
// 		headingDescription: `What is UX Design---Importancce of UX design---User centered design`,
// 	},
// 	{
// 		courseId: 'clxdf9wwr000432yns7u7yzfe',
// 		headingNumber: '2',
// 		headingName: 'Fundamentals of User Interface Design',
// 		headingDescription: `What is UI design---Best practices for UI design---Designing for mobile`,
// 	},
// 	{
// 		courseId: 'clxdf9wwr000432yns7u7yzfe',
// 		headingNumber: '3',
// 		headingName: 'Introduction to design tools',
// 		headingDescription: `Designing tools---Getting started with Figma`,
// 	},
// 	{
// 		courseId: 'clxdf9wwr000432yns7u7yzfe',
// 		headingNumber: '4',
// 		headingName: 'Visual Design fundamentals',
// 		headingDescription: `Typography---Color theory---Layout and composition`,
// 	},
// 	{
// 		courseId: 'clxdf9wwr000432yns7u7yzfe',
// 		headingNumber: '5',
// 		headingName: 'User Research',
// 		headingDescription: `Introduction to user research---Creating user personas---User journey mapping---User testing and heuristics evaluation`,
// 	},

// 	//mobile-app-development
// 	{
// 		courseId: 'clxdf9wws000532yngvcn0zgg',
// 		headingNumber: '1',
// 		headingName: 'Basic Introduction',
// 		headingDescription: `What is flutter?---Advantages of using flutter for app development---Installation of code editior and flutter setup---Installation of andriod studio and setups`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000532yngvcn0zgg',
// 		headingNumber: '2',
// 		headingName: 'Platform specific widgets',
// 		headingDescription: `Scaffold---Textfield---Elevated buttons---App bar---Bottom navigation bar---floating action button`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000532yngvcn0zgg',
// 		headingNumber: '3',
// 		headingName: 'Platform independent widgets',
// 		headingDescription: `Text widgets---Image widgets---Icon widgets---Form widgets`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000532yngvcn0zgg',
// 		headingNumber: '4',
// 		headingName: 'State maintenance widgets',
// 		headingDescription: `Stateless widgets---Stateful widgets`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000532yngvcn0zgg',
// 		headingNumber: '5',
// 		headingName: 'Using single child layouts',
// 		headingDescription: `Container---Center---Expended---Padding---Sixed box`,
// 	},

// 	//digital-marketing
// 	{
// 		courseId: 'clxdf9wws000632ynl6r8d1ae',
// 		headingNumber: '1',
// 		headingName: 'Digital Marketing Fundamentals',
// 		headingDescription: `What is digital marketing and why is it essential?---The different channels and tactics of digital marketing---Developing a digital marketing strategy`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000632ynl6r8d1ae',
// 		headingNumber: '2',
// 		headingName: 'Social Media Marketing',
// 		headingDescription: `Choosing the right platforms for your audience---Creating engaging content calendars---Running effective social media campaigns---Measuring social media success`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000632ynl6r8d1ae',
// 		headingNumber: '3',
// 		headingName: 'Digital Advertising',
// 		headingDescription: `Understanding different ad formats (display, search, social, video)`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000632ynl6r8d1ae',
// 		headingNumber: '4',
// 		headingName: 'Content Marketing',
// 		headingDescription: `Identifying your target audience and their needs---Creating a content strategy---Writing engaging and informative content---Distributing and promoting your content`,
// 	},

// 	//video-editing
// 	{
// 		courseId: 'clxdf9wws000732ynqq0t700z',
// 		headingNumber: '1',
// 		headingName: 'Introduction to Video Editing',
// 		headingDescription: `Introduction to video editing software---Overview of popular editing platforms (Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve etc)---Understanding the importance of editing in storytelling---Tour of the editing workspace---Understanding the timeline, preview window, and tool panels---Customizing the interface for efficient workflow---Importing media files into the project---Organizing footage in the project panel---Creating bins and folders for efficient media management---Cutting, trimming, and rearranging clips on the timeline---Using the razor tool for precise cuts---Understanding the ripple and roll edit tools for seamless editing transitions`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000732ynqq0t700z',
// 		headingNumber: '2',
// 		headingName: 'Intermediate Editing Techniques',
// 		headingDescription: `Adding transitions between clips for smooth visual flow---Applying video and audio effects to enhance the footage---Exploring preset effects and creating custom effects---Adjusting audio levels and volume keyframes---Adding music tracks and sound effects to enhance the audio experience---Syncing audio with video clips for perfect timing---Correcting color balance, exposure, and white balance issues---Applying color grading techniques to enhance the mood and tone of the footage---Using color scopes and waveform monitors for precise color adjustments---Creating and customizing text titles for video projects---Adding lower thirds, overlays, and other graphic elements---Animating text and graphics for dynamic visual effects`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000732ynqq0t700z',
// 		headingNumber: '3',
// 		headingName: 'Advanced Editing and Project Completion',
// 		headingDescription: `Exploring advanced transition effects for creative storytelling---Understanding export settings and formats for different platforms (YouTube, Vimeo, etc.)---Rendering options for optimal playback quality and file size---Exporting projects for final delivery and sharing---Reviewing participants\' editing projects---Providing constructive feedback and tips for improvement---Addressing any questions or concerns from participants---Assigning a final editing project to participants---Participants work on their final projects with guidance and support---Reviewing and presenting final projects, celebrating achievements, and discussing next steps`,
// 	},

// 	//project-management
// 	{
// 		courseId: 'clxdf9wws000832yn61go6khp',
// 		headingNumber: '1',
// 		headingName: 'Introduction to Project Management',
// 		headingDescription: `What is project management?---Project vs. Operations---Benefits of effective project management---Key project management terminology`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000832yn61go6khp',
// 		headingNumber: '2',
// 		headingName: 'Project Life Cycle',
// 		headingDescription: `Phases of a project (Initiation, Planning, Execution, Monitoring & Control, Closing)---Deliverables and activities at each stage---Project lifecycle models (e.g., Waterfall, Agile)`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000832yn61go6khp',
// 		headingNumber: '3',
// 		headingName: 'Project Planning',
// 		headingDescription: `Defining project scope (Work Breakdown Structure - WBS)---Developing a communication plan---Creating a project charter`,
// 	},
// 	{
// 		courseId: 'clxdf9wws000832yn61go6khp',
// 		headingNumber: '4',
// 		headingName: 'Project Risk Management',
// 		headingDescription: `Identifying potential project risks)---Assessing risk probability and impact---Monitoring and managing risks throughout the project`,
// 	},
// ];
