PalmTechnIQ Curriculum to Module Migration Documentation
Date: May 04, 2025

Prepared by: Ignatius Emeka Joshua, Head of Academy and Developer

Platform: PalmTechnIQ (https://www.palmtechniq.com/)

Purpose: To document the migration of Curriculum data to the Module structure, including schema updates and resolution of database inconsistencies.

Overview
PalmTechnIQ, an e-learning platform empowering learners worldwide with digital skills, underwent a significant database migration to restructure its course curriculum into a modular format. This process involved migrating 37 Curriculum entries to associated Module records, updating the Prisma schema, and resolving duplicate data issues to enforce unique constraints.

Migration Process
Step 1: Initial Migration
Action: Ran the script migrate-curriculum-to-modules.ts using npm run migrate-curriculum-to-modules.
Result: Successfully processed 37 Curriculum entries across multiple courses (e.g., clxgfalll00026prq7rg4dhhl, clxgfalll00066prq9y7ie54m).

Details: Existing Module records (e.g., cma9z2gqw000113cf2xers3ui, cma9z2jnx000313cf8dcm87yv) were updated with data from the corresponding Curriculum entries.

Step 2: Schema Synchronization with prisma db push
Initial Attempt: Ran npx prisma db push to apply schema changes.
Issue: Encountered warnings about required fields with NULL values:
updatedAt in Curriculum had 37 NULL values.
courseId in Review had 2 NULL values.
Resolution:
Updated schema.prisma to add @default(now()) to Curriculum.updatedAt.
Made Review.courseId nullable (String?) temporarily.
Ran SQL to update Curriculum.updatedAt with CURRENT_TIMESTAMP where NULL.
Updated Review.courseId NULL values with valid courseId values or deleted the affected rows.
Verification: Confirmed no NULL values remained using SELECT queries.

Step 3: Handling Duplicate Curriculum Entries
Issue: Discovered duplicate Curriculum entries for several courseId values (e.g., clxv7ahlr0000aavcbezibsz2 with 6 entries, clxgfalll00066prq9y7ie54m with 4 entries).
Inspection:
For courseId = 'clxv7ahlr0000aavcbezibsz2', the primary Curriculum (clxvnr0iu0000wuyn29rm3yvf) had 6 Module records, while 5 duplicates had 0.
Module data included 6 detailed records and 6 "N/A" entries, later cleaned up.
Initial Attempt: Tried DELETE FROM "Curriculum" WHERE id NOT IN (SELECT MIN(id) FROM "Curriculum" GROUP BY "courseId").
Error: Foreign key constraint violation (Module_curriculumId_fkey) because duplicate Curriculum entries (e.g., clxdlt1ax000mmakkirgz5oxu) had associated Module records.
Resolution:
Developed a TypeScript script (resolve-curriculum-duplicates.ts) to:
Identify duplicate courseId values.
Reassign Module records from duplicates to the primary Curriculum (lowest id).
Adjust Module.order to avoid conflicts.
Delete duplicate Curriculum entries.
Ran the script with npx tsx scripts/resolve-curriculum-duplicates.ts.
Verification: Confirmed no duplicates remained using SELECT "courseId", COUNT(*) as count FROM "Curriculum" GROUP BY "courseId" HAVING COUNT(*) > 1.

Step 4: Final Schema Application
Action: Ran npx prisma db push with @unique on Curriculum.courseId and required Review.courseId.
Result: Database synced successfully with no errors.
Verification: Confirmed schema alignment and data integrity.
Step 5: Cleanup
Removed "N/A" Module entries with DELETE FROM "Module" WHERE "headingName" = 'N/A' AND "headingDescription" = 'N/A' AND "duration" = 'N/A'.
Backed up the database and archived migration scripts.
Challenges and Solutions
Challenge	Solution
NULL values in updatedAt	Added @default(now()) and updated existing rows with CURRENT_TIMESTAMP.
NULL values in Review.courseId	Updated with valid courseId or deleted affected rows.
Duplicate Curriculum entries	Reassigned Module records to primary Curriculum and deleted duplicates.
Foreign key constraint violation	Handled Module reassignments before deletion using a script.
"N/A" Module entries	Deleted invalid entries to clean up data.
Final Schema Highlights
Curriculum:
courseId is now @unique, ensuring one Curriculum per course.
updatedAt is required with @default(now()).
Review:
courseId is now required (no NULL values).
Module:
Reassigned to primary Curriculum with updated order values.
Verification Checks
No duplicate Curriculum entries: SELECT "courseId", COUNT(*) as count FROM "Curriculum" GROUP BY "courseId" HAVING COUNT(*) > 1.
No NULL values in Curriculum.updatedAt: SELECT "updatedAt" FROM "Curriculum" WHERE "updatedAt" IS NULL.
No NULL values in Review.courseId: SELECT "courseId" FROM "Review" WHERE "courseId" IS NULL.
Intact Module data: SELECT m.id, m.curriculumId, m.headingNumber, m.headingName FROM "Module" m JOIN "Curriculum" c ON m.curriculumId = c.id WHERE c.courseId = 'some-course-id'.
Recommendations
Testing: Test new course creation, curriculum updates, and learner access to Module data.
Monitoring: Log errors and gather user feedback to catch edge cases.
Backup: Maintain regular database backups.
Prevention: Implement application-level validation to prevent future duplicates.

Conclusion
This migration successfully transformed PalmTechnIQ’s curriculum structure into a modular format, ensuring data integrity and schema consistency. The process, completed on May 04, 2025, reflects a robust approach to handling complex database changes while preserving educational content for learners worldwide.