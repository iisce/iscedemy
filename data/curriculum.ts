import { db } from '@/lib/db';

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
