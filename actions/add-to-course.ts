/**
 * Adds a user to a course by enrolling them using the provided user ID and course ID.
 * Logs the operation details and validates the input parameters before proceeding.
 *
 * @param userId - The unique identifier of the user to be enrolled in the course.
 * @param courseId - The unique identifier of the course to enroll the user in.
 *
 * @returns A promise that resolves when the operation is complete. If the userId or courseId
 *          is invalid, the function logs an error and returns early without performing the enrollment.
 */
'use server'

import { enrollUserInCourse } from "@/data/user";

export const addToCourse = async (userId: string, courseId: string) => {
	
	console.log('Server Action - userId:', userId, 'courseId:', courseId);

	if (!userId || !courseId) {
        console.error('Invalid userId or courseId');
        return;
    }
	enrollUserInCourse(userId, courseId);
};