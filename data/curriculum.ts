import { db } from '@/lib/db';

export const revalidate = 0;

export async function getAllCurriculumByCourseId(courseId: string) {
	try {
		const curriculum = await db.curriculum.findFirst({
			where: { courseId },
			include: {
				modules: {
					include: {
						lessons: true,
					}
				}
			}
		});

		return curriculum;
	} catch (error) {
		console.log({ error });
		return [];
	}
}
