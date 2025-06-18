export default function DocsFeatures() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Features</h1>
      <section id="features" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
        <p className="text-primary mb-4">
        {`  PalmTechnIQ is designed to empower learners and educators with a robust set of features, combining practical
          education with modern tools. Below is a detailed overview of the platform’s capabilities, organized by user
          role and core functionalities.`}
        </p>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Features for Non-Students (Users)</h3>
         <ul className="list-disc list-inside text-primary space-y-2 mb-4">
           <li>
             <strong>Public Exploration</strong>: {`Freely explore all public pages (e.g., course listings, blog, podcast)
             without requiring authentication, providing a preview of the platform’s offerings.`}
           </li>
           <li>
             <strong>Course Purchase</strong>: {`Purchase one or more courses to become a student. This process requires
             creating an account, initiating the journey into the learning ecosystem.`}
           </li>
           <li>
             <strong>Become a Tutor</strong>: {`Access the "Become a Tutor" route to apply and join the platform as a tutor,
             opening opportunities to create and manage educational content.`}
           </li>
         </ul>


        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Tutor Features</h3>
        <ul className="list-disc list-inside text-primary space-y-2 mb-4">
          <li>
            <strong>Course Management</strong>: {`Create, update courses with the ability to add modules,
            lessons, and curricula. Track student enrollment and progress in real-time.`}
          </li>
          <li>
            <strong>Assignment and Project Management</strong>: {`Design and distribute assignments/projects, review
            submissions, and provide grades.`}
          </li>
          <li>
            <strong>Mentorship Scheduling</strong>: {`Schedule mentorship sessions, mark them as completed or cancelled,
            and manage student bookings.`}
          </li>
          <li>
            <strong>Wallet and Payments</strong>: {`View earnings through a dedicated wallet, add bank account details, and
            request withdrawals. Includes an earnings overview chart for the last 7, 30, 90, or 365 days.`}
          </li>
          <li>
            <strong>Notification System</strong>: {`Receive email notifications whenever a student successfully registers
            for one of their courses.`}
          </li>
          <li>
            <strong>Profile Management</strong>: {`Update profile information, including name, email, and profile image.`}
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Student Features</h3>
        <ul className="list-disc list-inside text-primary space-y-2 mb-4">
          <li>
            <strong>Course Access</strong>: {`Purchase courses and access lessons, modules, and resources on the platform.`}
          </li>
          <li>
            <strong>Assignment and Project Submission</strong>: {`Submit assignments and projects for tutor review and
            feedback.`}
          </li>
          <li>
            <strong>Mentorship Booking</strong>: {`Book mentorship sessions with tutors and track session status.`}
          </li>
          <li>
            <strong>Progress Tracking</strong>: {`View grades, course completion status, and overall progress on a
            personalized dashboard.`}
          </li>
          <li>
             <strong>Certificate Verification</strong>: {`Verify certificates received upon course completion using a
             dedicated verification tool.`}
           </li>
           <li>
            <strong>Follow-Up Emails</strong>: {`Receive follow-up emails to support learning progress and engagement
            after course registration.`}
          </li>
          <li>
            <strong>Profile Updates</strong>: {`Modify profile details (e.g., name) and access a course overview of
            purchased courses.`}
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Admin Features</h3>
        <ul className="list-disc list-inside text-primary space-y-2 mb-4">
          <li>
            <strong>Dashboard Overview</strong>: {`Access a landing page with summaries of total revenue, courses, tutors,
            and students, plus detailed views of courses, students, and tutors.`}
          </li>
          <li>
            <strong>User and Course Management</strong>: {`Manage tutor and student data, including course assignments and
            transaction statuses.`}
          </li>
          <li>
            <strong>Platform Monitoring</strong>: {`Oversee platform health, user activity, and content updates.`}
          </li>
          <li>
            <strong>Mailing System Oversight</strong>: {`Monitor and manage the mailing system, including onboarding,
            follow-up, and tutor notification emails.`}
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">General Platform Features</h3>
        <ul className="list-disc list-inside text-primary space-y-2 mb-4">
          <li>
            <strong>PalmDesk Assistant</strong>:{` An AI-powered assistant (using the latest Google Gemini API) providing
            support for course inquiries, registration, technical issues, and personalized recommendations.`}
          </li>
          <li>
            <strong>Blog Section</strong>: {`The "Blog Square" offers educational content, updates, and community
            engagement with optimized metadata and author schemas.`}
          </li>
          <li>
            <strong>Community and Certificates</strong>: {`Foster a sense of community with real-time projects and award
            certificates upon course completion  verifiable via the platform.`}
          </li>
          <li>
             <strong>Security</strong>: {`Robust authentication and authorization mechanisms ensure secure access to
             protected routes and user data.`}
           </li>
           <li>
            <strong>Mailing System</strong>: {`Automated emails including onboarding for new users, follow-up mails for
            students, and notifications for tutors on student registrations.`}
          </li>
          <li>
            <strong>SEO Optimization</strong>: {`Enhanced metadata across all pages for better search engine visibility.`}
          </li>
        </ul>

        <p className="text-primary mt-4">
          {`These features are designed to support PalmTechnIQ’s mission of accessible education and skill development,`}{ ` `}
          <span className="font-bold">powered by ISCE Digital Concept.</span> {`Explore the other sections of this documentation for setup and contribution
          details.`}
        </p>
      </section>
    </div>
  );
}