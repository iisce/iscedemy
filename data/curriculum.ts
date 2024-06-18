import { db } from '@/lib/db';

export const revalidate = 0;

export async function getAllCurriculumByCourseId(courseId: string) {
	try {
		const courses = await db.curriculum.findMany({
			where: { courseId },
			orderBy: { headingNumber: 'asc' },
		});

		return courses;
	} catch (error) {
		console.log({ error });
		return [];
	}
}
