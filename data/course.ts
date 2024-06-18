import { db } from '@/lib/db';

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
