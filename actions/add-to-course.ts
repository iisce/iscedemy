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