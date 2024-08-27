import { db } from '@/lib/db';
import { getSession } from 'next-auth/react';
import { enrollUserInCourse } from './user';

export const revalidate = 0;

export async function getAllCourses() {
	try {
		const courses = await db.course.findMany({
			orderBy: { title: 'desc' },
		});

		return courses;
	} catch (error) {
		console.log({ error });
		return [];
	}
}

export async function getCourseById(id: string) {
	try {
		const course = await db.course.findUnique({
			where: { id },
		});

		return course;
	} catch (error) {
		console.log({ error });
		return null;
	}
}

export async function getCourseBySlug(slug: string) {
	try {
		const course = await db.course.findFirst({
			where: { title: slug },
		});

		return course;
	} catch (error) {
		console.log({ error });
		return null;
	}
}

export async function enrollInCourse(courseId: string){
	try{
		const session = await getSession();

		if(!session?.user?.id){
			throw new Error('User is not authenticated');
		}

		const success = await enrollUserInCourse(session.user.id, courseId);
		console.log(success);
		if (!success) {
            throw new Error('Could not enroll user in course');
        }
		return {success: true};
	} catch (error) {
		console.error('Error enrolling in course:', error);
		console.log('Detailed error:', error);
		return { success: false, error: error };
	}
}