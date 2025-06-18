## 1.0.0 (2024-06-02)

### Added
- Dynamic review system for tutors
- Course metadata for improved SEO and social sharing

### Changed
- Updated styling and layout of course pages
- Improved form validation for course registration

### Fixed
- Minor bug fixes and performance improvements

## 1.0.1 (2024-06-02)

### Added 
- Committed package.json file to project
- Changelog file

## 1.0.2 (2024-06-03)
### Added
- sitemap file for SEO purposes
- robots file for Google crawling (SEO)
- Added robots on privacy-policy page

## 1.1.0 (2024-06-12)
### Added
- PalmDesk AI Chatbot Widget: Introduced an interactive chatbot widget powered by Google Gemini 1.5 Flash. The chatbot provides information about courses, answers FAQs, and assists with registration and technical support inquiries.
- Added a new course and tutor for video editing.
- Added a new entry to the course registration table.
- Added an email template for successful registration of courses.
- Visual Enhancements: Improved the visual appearance and user experience of the chatbot widget.

### Changed
- Updated metadata for course pages to improve SEO.
- Several UI improvements and bug fixes.

## 1.2.0 (2024-07-02)
### Added
- Tutor Dashboard: Now tutors can access their dashboard and perform CRUD operations aside from adding and deleting courses.
- Added and completed tutor dashboard.
- Added quick replies for the chatbot to improve user experience.
- Added a new course and new tutor.

### Changed
- Changed the interface of the PalmDesk AI Chatbot.

## 2.0.0 - (2024-08-02)

### Added
- **Tutor Display Enhancements:**
  - Updated `TutorCard` component to display tutor name, image, position, description, email, and associated courses.
  - Implemented server actions for fetching tutor data efficiently.
  - Styled tutor cards using Tailwind CSS for a modern and responsive design.

- **Course Handling Improvements:**
  - Enhanced `AdminCourseList` component for better course management.
  - Integrated new server actions for updating and fetching course data.
  - Improved error handling and user feedback mechanisms for course operations.

- **Admin Dashboard Features:**
  - **Landing Page:**
    - Summary information display including total revenue from all courses, revenue per course, number of courses, number of tutors, number of students per tutor, and total number of students.
  - **Courses Page:**
    - List of all available courses on the platform with the respective tutor.
  - **Students Page:**
    - List of active students based on their transaction status 'SUCCESSFUL', providing student info including name, email, phone number, and list of courses they enrolled in.
  - **Tutors Page:**
    - Detailed information on tutors, including their associated courses.

- **Blog Section:**
  - Introduced a new blog page titled "Blog Square".
  - Designed a user-friendly layout for the blog page, featuring recent posts and categories.
  - Implemented functionality to fetch and display blog posts dynamically.

### Changed
- Updated routing structure for better maintainability and scalability.
- Improved overall codebase structure and readability.

### Fixed
- Resolved issues related to dynamic routing and data fetching.
- Fixed image loading errors by configuring external domains in `next.config.js`.
- Fixed login `maxAge` to automatically log out non-active users after a specified time.

### Security
- Ensured secure handling of user data in all server actions.
- Updated dependencies to the latest secure versions.

## 2.1.0 - (2025-06-18)

### Added
- **Tutor Enhancements:**
  - Restructured course system to allow tutors to create, update, and delete courses.
  - Added functionality for tutors to manage assignments and projects.
  - Implemented scheduling and management of mentorship sessions (mark as completed or cancelled).
  - Enabled grading of student projects and assignments.
  - Allowed tutors to update course curriculum, add modules, and lessons.
  - Introduced tracking of student progress within courses.
  - Added wallet feature for tutors to view earnings, add bank account details, and request withdrawals.
  - Included an earnings overview chart displaying "Course Payment" transactions.

- **Student Enhancements:**
  - Enabled students to purchase courses and access lessons on the platform.
  - Added ability for students to submit assignments and projects.
  - Implemented booking and management of mentorship sessions.
  - Allowed students to view grades and track course progress.
  - Enabled profile updates (e.g., change name) and dashboard access.
  - Provided a course overview page listing all purchased courses.

- **General Improvements:**
  - Enhanced UI/UX with responsive design updates across tutor and student interfaces.
  - Improved data fetching and server action performance for real-time updates.

- **PalmDesk Assistant Upgrade:**
  - Upgraded the PalmDesk AI Chatbot to the PalmDesk Assistant, now powered by the latest Google Gemini API version.
  - Enhanced assistant capabilities to provide comprehensive support for users and prospects, including detailed platform information, course guidance, registration assistance, technical support, and personalized recommendations.

- **Blog Page Improvements:**
  - Updated blog metadata to include blog slug for improved SEO.
  - Added author information to the schema for better search engine indexing.

### Changed
- Refactored codebase to support new tutor and student functionalities.
- Updated transaction type filtering in the earnings chart to include "Course Payment".
- Replaced the PalmDesk AI Chatbot with the improved PalmDesk Assistant interface.
- Standardized and fixed metadata across all platform pages for enhanced SEO.
- Optimized database schema with Prisma to support new tutor, student, and wallet functionalities.

### Fixed
- Resolved chart data aggregation issue to correctly display earnings for the selected period.
- Ensured proper date parsing for transaction filtering in the wallet chart.

### Deployment
- Deployed to live environment, making all new features available to users worldwide.