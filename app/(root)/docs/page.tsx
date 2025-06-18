import Link from "next/link";

export default function DocsIntroduction() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">PalmTechnIQ Documentation</h1>

      <section id="introduction" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Introduction</h2>
        <p className="text-primary mb-4">
         {` Welcome to the official documentation for`} <strong>PalmTechnIQ</strong>, {`an innovative e-learning platform
          dedicated to empowering individuals worldwide with digital skills. Our mission is to provide accessible,
          high-quality education across diverse fields such as technology, business, arts, and more, catering to
          beginners, professionals, and everyone in between. Whether you’re a learner, tutor, developer, or contributor,
          this documentation is your gateway to understanding, setting up, and extending the PalmTechnIQ ecosystem.`}
        </p>
         <p className="text-primary mb-4">
          {`PalmTechnIQ combines practical learning with real-world application, offering features like virtual and
          physical classes, certificates, mentorship, real-time projects, and a vibrant community. This documentation
          will guide you through the platform’s functionalities, setup processes, and contribution opportunities,
          ensuring you can make the most of its capabilities.`}
        </p>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Vision Statement</h3>
        <p className="text-primary mb-4">
         {` At PalmTechnIQ, our vision is to create a global learning community where every individual can unlock their
          potential, master digital skills, and thrive in the digital economy. We aim to bridge the gap between
          education and opportunity, fostering innovation, creativity, and lifelong learning for all.`}
        </p>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">About ISCE Digital Concept</h3>
        <p className="text-primary mb-4">
         {` PalmTechnIQ is a proud product of`} <strong>{`ISCE Digital Concept`}</strong>, {`a tech company committed to fostering
          the growth of young and ready minds who love to explore their potentials in identifying their skills and
          pursuing their passions. ISCE Digital Concept is dedicated to nurturing talent, driving innovation, and
          supporting the development of future leaders in the digital space.`}
        </p>
        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">{`Who This Documentation Is For`}</h3>

         <ul className="list-disc list-inside text-primary space-y-2">
          <li>
            <strong>{`Developers and Contributors`}</strong>: {`Learn how to set up the project, contribute code, and enhance
            features.`}
          </li>
          <li>
            <strong>{`Tutors`}</strong>: {`Understand how to manage courses, mentorships, and payments through the tutor
            dashboard.`}
          </li>
          <li>
            <strong>{`Students`}</strong>: {`Explore how to navigate courses, submit assignments, and track progress.`}
          </li>
          <li>
            <strong>{`Admins`}</strong>: {`Gain insights into managing the platform’s backend and user data.`}
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">How to Use This Documentation</h3>

        <p className="text-primar ">
          {`Navigate using the sidebar to explore sections like Installation, Features, API, and Contributing. Each page
          provides step-by-step guidance, code examples, and best practices. For the latest updates, check the`}
          <Link href="/docs/changelog" className="text-green-600 hover:text-green-800 ml-1">
            Changelog
          </Link>
          .
        </p>
      </section>
    </div>
  );
}