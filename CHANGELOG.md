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
- sitemap file for seo purposes
- robots file for google crawling (seo)
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
- Tutor Dashboard : Now tutors can now access their dashboard and will be able to perform CRUD aside adding and deleting of course.
- Added and completed tutor dashboard. 
- Added quick replies for the chatbot to improve user experience
- Added a new course and new tutor

### Changed 
- Chnaged the interface of the PalmDesk AI Chatbot 
             
## 2.0.0 - (2024-08-02)

### Added
- **Tutor Display Enhancements:**
  - Updated `TutorCard` component to display tutor name, image, position, description, email, and associated courses.
  - Implemented server actions for fetching tutor data efficiently.
  - Styled tutor cards using Tailwind CSS for a modern and responsive design.

- **Course Handling Improvements:**
  - Enhanced `AdminCourseList` component for better course management.
  - Integrate new server actions for updating and fetching course data.
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
