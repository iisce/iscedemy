import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function seed() {
    const tutor = await prisma.user.createMany({
        data: [
            {
                name: 'Paul Ayobami',
                description: `Senior front-end developer with years of expertise crafting exceptional user experiences and building robust, scalable web applications. Proven track record of leading development teams, implementing cutting-edge technologies, and delivering high-quality products that exceed user expectations. Passionate about creating intuitive, visually appealing, and high-performing user interfaces that delight users and drive business results.`,
                email: 'ap.oyenran@gmail.com',
                position: 'Senior frontend Developer',
                emailVerified: new Date(),
                image: '/images/paul.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
            {
                name: 'Ezekiel Mahoussi',
                description: `I am a visual storyteller, strategist and graphic designer, I create problem solving designs with a streamlined process using various design tools.`,
                email: 'designbyeasy@gmail.com',
                position: 'Graphic Designer',
                emailVerified: new Date(),
                image: '/images/ezekiel.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
            {
                name: 'Mawuli Owusu Promise',
                description: `I am an innovative designer who is passionate about creativity and functional user centric products. I believe that a well-crafted interface should feel like a calm guided journey rather than a chaotic maze. I am experienced in designing experiences for web and mobile applications, as well as rebranding and redesigning experiences. I have previously worked on applications that have relevance in transportation, E-commerce, FinTech and health sector.`,
                email: 'mawuliowusu@gmail.com',
                position: 'Design Expert',
                emailVerified: new Date(),
                image: '/images/wuli.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
            {
                name: 'Temitope Paul-Bamidele',
                description: `Highly experienced cybersecurity analyst with  years of expertise in protecting digital assets from cyber threats. Proven track record of developing and implementing comprehensive security strategies, conducting penetration testing, and incident response. Skilled in threat analysis, vulnerability assessment, and security architecture. Proficient in industry-leading tools and technologies, including firewalls, intrusion detection systems, and encryption protocols.`,
                email: 'Topsyshieldsolutions@gmail.com',
                position: 'Cyber Expert/Home Expert',
                emailVerified: new Date(),
                image: '/images/tems.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
            {
                name: 'Emmanuel Akhabue',
                description: `I thrive on leading teams and projects to successful outcomes. Proficient in utilizing various project management methodologies, including Agile and Waterfall, adapting my approach to suit the specific needs of each project.`,
                email: 'eoziegbe2@gmail.com',
                position: 'Project manager',
                emailVerified: new Date(),
                image: '/images/emma.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
            {
                name: 'David Sokeye',
                description: `Proficient in Dart programming language and Flutter framework Strong knowledge of object-oriented programming (OOP) principles Experience in developing and implementing UI/UX designs Expertise in integrating RESTful APIs`,
                email: 'oladimejidavid91@gmail.com',
                position: 'Flutter & Dart Developer',
                emailVerified: new Date(),
                image: '/images/david.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
            {
                name: 'Emeka Ignatius',
                description: `Creative Digital Marketer specializing in crafting compelling content that connects with audiences and drives engagement. Experienced in developing content strategies, writing engaging, and optimizing content for SEO. Adept at social media storytelling and managing online communities.Passionate about leveraging digital tools and trends to promote brands and achieve measurable growth.`,
                email: 'emekaignatius5@gmail.com',
                position: 'Digital Specialist',
                emailVerified: new Date(),
                image: '/images/emeka.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
            {
                name: 'Anthony Nnamdi O.',
                description: `Anthony Nnamdi is a digital/visual content consultant and creator with vast knowledge and experience in Media/Tech. Specialises on Videography/Video Editing, Photography/Retouching, Graphics Design/UI/UX, Social Media Marketing, I have worked with a number of individual brands, startups and companies (Real Estate, Tech, Beverage, Cosmetic, logistics, FX etc). I am ever ready to share my years of experience and to teach students or anyone who is intrested or ready to start a career in the media space.`,
                email: 'imusttalkmedia@gmail.com',
                position: 'Content Creator',
                emailVerified: new Date(),
                image: '/images/anthony.jpg',
                password: '',
                phone: '',
                role: 'TUTOR'
            },
        ]
    })

    console.log(`${tutor.count} Tutor Created`)

    
    const course = await prisma.course.createMany({
        data: [
            {
                title: `web-development`,
                category: `Engineering`,
                textSnippet:  'Take charge of your tech career with our {courseDetails.title} Crash Course!',
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwtk0000nv128b2kh5zy`,
                description: `You'll master the fundamental languages of the web (HTML, CSS, and JavaScript) and dive into React, a powerful tool for creating dynamic user interfaces. Learn to craft stunning layouts, bring your designs to life with interactive elements, and create responsive websites that look amazing on any device. No prior coding experience is required – just a passion for building awesome things on the web!`,
                conclusion: `By the end of this crash course, you'll have a solid foundation in web development and the skills to start building your own amazing websites!`,
                summary: `Web Fundamentals: Grasp the core building blocks of every website: HTML for structure, CSS for style, and JavaScript for interactivity.---React Essentials:Get introduced to React, the go-to library for crafting modern, component-based web applications. Build interactive UIs that are easy to maintain and scale.---Responsive Design knowledge: Learn to create websites that adapt seamlessly to different screen sizes, ensuring a great user experience on desktops, tablets, and mobile devices.---Dynamic Web Pages: Go beyond static content and build web pages that respond to user actions, update in real time, and deliver a truly engaging experience.`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `smart-home-automation`,
                category: `Technology`,
                textSnippet: 'Transform Your Home with our {courseDetails.title} Crash Course!',
                videoUrl: `/images/workspaces.webm`,
                tutorId: `clxdcdwu70003nv12vdw09or9`,
                description: `Know the inner workings of smart-home automation in this captivating course! Let's show you the secrets of how devices communicate, store data, and orchestrate incredible experiences within your home. Get set to transform your living space with the power of automation!!`,
                conclusion: `By the end of this course, you'll be able to understand and navigate your way around smart home automation, ready to transform your living space into a futuristic haven of comfort, convenience, and control.`,
                summary: `The ABCs of Smart Homes. You'll get a friendly introduction to the world of smart home automation, from the gadgets that make it happen to the amazing things you can do with it.---Know the control central behind the operation – smart hubs and controllers.You'll learn how they connect your devices and make your home truly smart.---Understand smart lighting – dim the lights for movie night, wake up to a sunrise glow, or set the mood with colorful scenes, all from your phone or with voice commands.---Keep your home safe and secure with smart security systems. Monitor cameras, lock doors remotely, and even receive alerts when someone's at your door.`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `cybersecurity`,
                category: `Security`,
                textSnippet: 'Become a Cyber Guardian with our {courseDetails.title} Crash Course.Your Essential Guide to Online Security',
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwu70003nv12vdw09or9`,
                description: `Become a digital defender! Protect your online world from sneaky cyber villains. Learn how to safeguard your information, spot online scams, and keep your devices safe from harm.`,
                conclusion: `By the end of this course, you'll be equipped with the knowledge and tools to protect yourself in the digital world. You'll navigate the internet with confidence, knowing how to outsmart cyber villains and keep your information safe.`,
                summary: `Get a solid foundation in the essentials of cybersecurity.You'll understand the common threats, and why protecting your online world is crucial.---Know different types of cyber attacks – from sneaky viruses and malware to phishing scams and identity theft. Learn how hackers operate so you can stay one step ahead.---Master the fundamental security measures everyone should know. From how to create strong passwords, safeguarding your personal information, and protect your devices from harm.---Dip your toes into the world of cryptography – the secret language of cybersecurity. Get a basic understanding of how encryption works and why it's so important for online security.`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `graphic-design`,
                category: `Design`,
                textSnippet: 'From Doodles to Designs! Jumpstart Your Design Career with Our {courseDetails.title} Crash Course!',
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwu70001nv12aibqdyh4`,
                description: `Make your ideas come to life! Learn to design amazing logos, posters, and images that grab attention and tell your story. Express yourself through colors, shapes, and stunning visuals.`,
                conclusion: `By the end of this course, you'll have a clear understanding &  foundation in graphic design principles, software proficiency, and the confidence to start creating your own stunning visuals.`,
                summary: `Get a clear and concise introduction to the world of graphic design. You'll understand what it is, why it's important, and how it shapes our visual landscape.---key roles and responsibilities of a graphic designer. Learn about the different career paths available and the skills you'll need to succeed.---Get acquainted with the essential software and tools used by professional graphic designers. We'll cover industry standards like Adobe Photoshop and Illustrator, as well as other helpful resources.---Learn how to install and set up your design software, so you're ready to start creating from day one. We'll guide you through the process step-by-step.---Start your design journey by exploring the selection tool – your key to manipulating images and elements within your designs. This is the first step towards unleashing your creativity!`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `ui-ux-designing`,
                category: `Design`,
                textSnippet: 'Design Digital Delights with our {courseDetails.title} Crash Course. A Practical Guide to UI/UX Fundamentals',
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwu70002nv12r7mcbzki`,
                description: `Learn how to make websites look beautiful and work smoothly! In this class, you'll discover the secrets to designing websites that people love to use. We'll cover the basics of website building and teach you how to create stylish layouts, eye-catching visuals, and simple navigation. Can't wait to see you in class. Register now lets build something magical.`,
                conclusion: `By the end of this course, you'll have a solid fundamental foundation in UI/UX design and the confidence to start building your own amazing websites. Let's create some digital magic together!`,
                summary: `Basic understanding on what UI/UX designing is all about.---The magic behind user interface (UI) and user experience (UX) design. You'll understand why it's so important for creating websites and apps that people actually enjoy using.---Learn the secrets of user-centered design. Find out how to think like your target audience so you can build websites that cater to their needs and desires.---Understand the fundamental principles of good UI design. Discover the best practices for creating intuitive interfaces that are both visually appealing and easy to navigate.---Tools for desinging and how to use them effectively in design.---Understand visual design and how to implement them.---How to conduct a user research.`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `mobile-app-development`,
                category: `Application`,
                textSnippet: 'Build Your App-titude! A Hands-On {courseDetails.title} Crash Course for Aspiring Developers.',
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwu70005nv12rh9d7480`,
                description: `Dive into front-end development using HTML, CSS, and JavaScript. Learn to craft web pages and use React develop engaging user-focused web applications.Get skills in creating dynamic and responsive interfaces. Learn efficient styling and layout techniques. `,
                conclusion: `By the end of this course, you'll have the skills and confidence to bring your app ideas to life, whether you're building the next viral sensation or a handy tool for your own personal use.`,
                summary: `Understand the basic concepts of mobile app development---Navigate around the flutter world---Basic setups of andriod using code editiors---Ability to use  platforms specific widgets---Know how to use state maintenance widgets---Understand navigation routing and controllers in flutter`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `digital-marketing`,
                category: `Business`,
                textSnippet: 'Understand the Art of Online Influence with our {courseDetails.title} Crash Course!',
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwu80006nv12j7dx8rzj`,
                description: `Become a digital marketing whiz and learn how to take your message to the masses in this exciting, hands-on course. Reach the world with your message! Discover the exciting ways to promote products, ideas, or even yourself online. Learn how to use social media, create awesome ads, and attract fans and followers.Whether you're promoting a business, a product, a cause, or even yourself, this course will equip you with the tools you need to make a real impact online.`,
                conclusion: `By the end of this course, you'll be equipped with the right digital marketing skills, ready to launch successful campaigns, grow your online presence, and achieve your marketing goals.`,
                summary: `The Digital Marketing scopes: You'll get a clear overview of the digital marketing world, from social media platforms and search engines to email campaigns and paid advertising. Understand how each piece fits into a comprehensive strategy.---Social Media Superstar: You'll learn to harness the power of platforms like Facebook, Instagram, Twitter, and LinkedIn.How to create engaging content, build a loyal following, and drive traffic to your website or landing pages.---Explore the different types of digital advertising, understand targeting options, and measure your ad performance.---Discover how to create valuable content that attracts and delights your audience. Learn to write compelling blog posts, articles, and social media updates that resonate with your target market.`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `video-editing`,
                category: `Technology`,
                textSnippet:  `Learn How To Make & Edit Videos Like A Pro in 3 days: get jobs and start earning. With this {courseDetails.title} Crash Course!`,
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwu80007nv12lihkxc2q`,
                description: `This intensive three-day crash course in video editing provides you with a comprehensi`,
                conclusion: `By the end of this course you must have learned how to make a video, mastered a video editing software, understand editing and moved from a novice or a beginner to a good video editor who edits polished and professional-looking video`,
                summary: `How to make/shoot good video. (Basic Video Making Tips)---Proficiency in using a popular editing software such as Adobe Premiere Pro, Cap Cut, Film or
                a, Final Cut Pro, or DaVinci Resolve etc---Understanding of fundamental editing techniques such as cutting, trimming, and organizing
                footage on the timeline.---Mastery of intermediate editing skills including transitions, effects, audio manipulation, color
                correction, and titling.---Ability to apply advanced editing techniques such as graphics application and advanced
                transitions for creative storytelling.---Competence in exporting and rendering projects for various platforms, ensuring optimal
                playback quality and file size.---Confidence in producing professional-quality videos, whether for personal projects, social
                media content, or professional endeavors.---Bonus: Learn how to make or shoot a video
                (Basic Videography Tips)`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
            {
                title: `project-management`,
                category: `Business`,
                textSnippet: 'Lead with Confidence! Conquer Project Chaos with Our {courseDetails.title} Crash Course',
                videoUrl: `/images/aboutsectionvideo.mp4`,
                tutorId: `clxdcdwu70004nv12q52dirjx`,
                description: `Be the ultimate organizer! Master the skills to lead projects from start to finish. Learn to set goals, manage timelines, and keep your team on track for success. It's like being the boss of your own adventure!`,
                conclusion: `By the end of this crash course, you'll be equipped with the essential project management knowledge and tools to successfully initiate, plan, execute, and close projects of varying complexities. `,
                summary: `Define key project management concepts and terminology.---Understand the project life cycle.---Develop essential project management skills: planning, scheduling, budgeting, and risk management.---Apply effective communication and stakeholder management techniques.`,
                virtualPrice: 30000,
                physicalPrice: 50000 ,
                noOfClass: `3`,
                classDays: `Monday---Wednesday---Friday`,
                duration: `6 hrs`,
                certificate: true,
            },
        ]
    })
    
    console.log(`${course.count} Courses Created`)


    const curriculum = await prisma.curriculum.createMany({
        data: [
            {
                courseId: 'clxdf9wva000032yne2crrdzx',
                headingNumber: '1',
                headingName: 'Introduction to Web Development',
                headingDescription: `What is web development?---Front-end vs. back-end development---Setting up your development environment`,
            },
            {
                courseId: 'clxdf9wva000032yne2crrdzx',
                headingNumber: '2',
                headingName: 'HTML (HyperText Markup Language)',
                headingDescription: `Basic HTML tags and structure---Creating elements, headings, paragraphs, lists, images, and links---Building simple web page layouts`,
            },
            {
                courseId: 'clxdf9wva000032yne2crrdzx',
                headingNumber: '3',
                headingName: 'CSS (Cascading Style Sheets)',
                headingDescription: `Styling HTML elements: colors, fonts, spacing, and backgrounds---Creating responsive layouts with Flexbox or Grid---Basic CSS animations and transitions`,
            },
            {
                courseId: 'clxdf9wva000032yne2crrdzx',
                headingNumber: '4',
                headingName: 'JavaScript (JS)',
                headingDescription: `Variables, data types, and operators---Functions and conditional statements (if/else)---DOM manipulation: interacting with HTML elements using JS`,
            },
            {
                courseId: 'clxdf9wva000032yne2crrdzx',
                headingNumber: '5',
                headingName: 'React Introduction',
                headingDescription: `What is React?---Creating simple React components---Basic state management and rendering`,
            },
        
        
            {
                courseId: 'clxdf9wwr000132yn7qfdpp7e',
                headingNumber: '1',
                headingName: 'Basic Introduction',
                headingDescription: `Introduction to smart home automation---Smart home hubs and controllers---Smart lighting---Smart security and surveillance systems---Smart temperature and environmental control---Smart  home entertainment`,
            },
            {
                courseId: 'clxdf9wwr000232yn2nwtc1wq',
                headingNumber: '1',
                headingName: 'Basic Introduction',
                headingDescription: `Introduction to cybersecurity---Types of cyber threats---basic security measure---Basic crytography---Threat detection and response`,
            },
        
            {
                courseId: 'clxdf9wwr000332ynkke3keaj',
                headingNumber: '1',
                headingName: 'Introduction to graphics design',
                headingDescription: `Brief Explanation of graphics design---Roles of a graphics designer---Design tools and software---Installation`,
            },
            {
                courseId: 'clxdf9wwr000332ynkke3keaj',
                headingNumber: '2',
                headingName: 'Vectors and Rasters',
                headingDescription: `Introduction to basic tools i.e selection tool---Understanding design principles---Designing simple filers with minimal effects---Redesigning popular logos and fliers`,
            },
            {
                courseId: 'clxdf9wwr000332ynkke3keaj',
                headingNumber: '3',
                headingName: 'Interpretation of design',
                headingDescription: `Creating color palette---Color psychology---Researching ideas---Class work`,
            },
            

            {
                courseId: 'clxdf9wwr000432yns7u7yzfe',
                headingNumber: '1',
                headingName: 'Basic Introduction',
                headingDescription: `What is UX Design---Importancce of UX design---User centered design`,
            },
            {
                courseId: 'clxdf9wwr000432yns7u7yzfe',
                headingNumber: '2',
                headingName: 'Fundamentals of User Interface Design',
                headingDescription: `What is UI design---Best practices for UI design---Designing for mobile`,
            },
            {
                courseId: 'clxdf9wwr000432yns7u7yzfe',
                headingNumber: '3',
                headingName: 'Introduction to design tools',
                headingDescription: `Designing tools---Getting started with Figma`,
            },
            {
                courseId: 'clxdf9wwr000432yns7u7yzfe',
                headingNumber: '4',
                headingName: 'Visual Design fundamentals',
                headingDescription: `Typography---Color theory---Layout and composition`,
            },
            {
                courseId: 'clxdf9wwr000432yns7u7yzfe',
                headingNumber: '5',
                headingName: 'User Research',
                headingDescription: `Introduction to user research---Creating user personas---User journey mapping---User testing and heuristics evaluation`,
            },

            {
                courseId: 'clxdf9wws000532yngvcn0zgg',
                headingNumber: '1',
                headingName: 'Basic Introduction',
                headingDescription: `What is flutter?---Advantages of using flutter for app development---Installation of code editior and flutter setup---Installation of andriod studio and setups`,
            },
            {
                courseId: 'clxdf9wws000532yngvcn0zgg',
                headingNumber: '2',
                headingName: 'Platform specific widgets',
                headingDescription: `Scaffold---Textfield---Elevated buttons---App bar---Bottom navigation bar---floating action button`,
            },
            {
                courseId: 'clxdf9wws000532yngvcn0zgg',
                headingNumber: '3',
                headingName: 'Platform independent widgets',
                headingDescription: `Text widgets---Image widgets---Icon widgets---Form widgets`,
            },
            {
                courseId: 'clxdf9wws000532yngvcn0zgg',
                headingNumber: '4',
                headingName: 'State maintenance widgets',
                headingDescription: `Stateless widgets---Stateful widgets`,
            },
            {
                courseId: 'clxdf9wws000532yngvcn0zgg',
                headingNumber: '5',
                headingName: 'Using single child layouts',
                headingDescription: `Container---Center---Expended---Padding---Sixed box`,
            },

            {
                courseId: 'clxdf9wws000632ynl6r8d1ae',
                headingNumber: '1',
                headingName: 'Digital Marketing Fundamentals',
                headingDescription: `What is digital marketing and why is it essential?---The different channels and tactics of digital marketing---Developing a digital marketing strategy`,
            },
            {
                courseId: 'clxdf9wws000632ynl6r8d1ae',
                headingNumber: '2',
                headingName: 'Social Media Marketing',
                headingDescription: `Choosing the right platforms for your audience---Creating engaging content calendars---Running effective social media campaigns---Measuring social media success`,
            },
            {
                courseId: 'clxdf9wws000632ynl6r8d1ae',
                headingNumber: '3',
                headingName: 'Digital Advertising',
                headingDescription: `Understanding different ad formats (display, search, social, video)`,
            },
            {
                courseId: 'clxdf9wws000632ynl6r8d1ae',
                headingNumber: '4',
                headingName: 'Content Marketing',
                headingDescription: `Identifying your target audience and their needs---Creating a content strategy---Writing engaging and informative content---Distributing and promoting your content`,
            },
 
            {
                courseId: 'clxdf9wws000732ynqq0t700z',
                headingNumber: '1',
                headingName: 'Introduction to Video Editing',
                headingDescription: `Introduction to video editing software---Overview of popular editing platforms (Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve etc)---Understanding the importance of editing in storytelling---Tour of the editing workspace---Understanding the timeline, preview window, and tool panels---Customizing the interface for efficient workflow---Importing media files into the project---Organizing footage in the project panel---Creating bins and folders for efficient media management---Cutting, trimming, and rearranging clips on the timeline---Using the razor tool for precise cuts---Understanding the ripple and roll edit tools for seamless editing transitions`,
            },
            {
                courseId: 'clxdf9wws000732ynqq0t700z',
                headingNumber: '2',
                headingName: 'Intermediate Editing Techniques',
                headingDescription: `Adding transitions between clips for smooth visual flow---Applying video and audio effects to enhance the footage---Exploring preset effects and creating custom effects---Adjusting audio levels and volume keyframes---Adding music tracks and sound effects to enhance the audio experience---Syncing audio with video clips for perfect timing---Correcting color balance, exposure, and white balance issues---Applying color grading techniques to enhance the mood and tone of the footage---Using color scopes and waveform monitors for precise color adjustments---Creating and customizing text titles for video projects---Adding lower thirds, overlays, and other graphic elements---Animating text and graphics for dynamic visual effects`,
            },
            {
                courseId: 'clxdf9wws000732ynqq0t700z',
                headingNumber: '3',
                headingName: 'Advanced Editing and Project Completion',
                headingDescription: `Exploring advanced transition effects for creative storytelling---Understanding export settings and formats for different platforms (YouTube, Vimeo, etc.)---Rendering options for optimal playback quality and file size---Exporting projects for final delivery and sharing---Reviewing participants\' editing projects---Providing constructive feedback and tips for improvement---Addressing any questions or concerns from participants---Assigning a final editing project to participants---Participants work on their final projects with guidance and support---Reviewing and presenting final projects, celebrating achievements, and discussing next steps`,
            },

            {
                courseId: 'clxdf9wws000832yn61go6khp',
                headingNumber: '1',
                headingName: 'Introduction to Project Management',
                headingDescription: `What is project management?---Project vs. Operations---Benefits of effective project management---Key project management terminology`,
            },
            {
                courseId: 'clxdf9wws000832yn61go6khp',
                headingNumber: '2',
                headingName: 'Project Life Cycle',
                headingDescription: `Phases of a project (Initiation, Planning, Execution, Monitoring & Control, Closing)---Deliverables and activities at each stage---Project lifecycle models (e.g., Waterfall, Agile)`,
            },
            {
                courseId: 'clxdf9wws000832yn61go6khp',
                headingNumber: '3',
                headingName: 'Project Planning',
                headingDescription: `Defining project scope (Work Breakdown Structure - WBS)---Developing a communication plan---Creating a project charter`,
            },
            {
                courseId: 'clxdf9wws000832yn61go6khp',
                headingNumber: '4',
                headingName: 'Project Risk Management',
                headingDescription: `Identifying potential project risks)---Assessing risk probability and impact---Monitoring and managing risks throughout the project`,
            },
        ] 
    })

    console.log(`${curriculum.count} Curriculum Created`)
}
seed().catch((error)=>{
    console.log({error})
    process.exit(1)
}).finally(async ()=>{
    await prisma.$disconnect()
}) 