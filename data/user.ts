import { db } from '@/lib/db';

export const revalidate = 0;

export default async function getUserByEmail(email: string) {
	try {
		const user = await db.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	} catch {
		return null;
		
	}
}
export async function getUserById(id: string) {
	try {
		const user = await db.user.findUnique({
			where: {
				id,
			},
		});
		return user;
	} catch {
		return null;
	}
}

export async function getUserByCourseId(course: string) {
	try {
		const user = await db.user.findMany({
			where: {
				courses: {
					contains: course,
					mode: 'insensitive',
				},
			},
		});
		return user;
	} catch {
		return null;
	}
}

export async function getTotalUsersExcludingTutors() {
	try {
		const count = await db.user.count({
			where: {
				role: {
					not: 'TUTOR' || 'ADMIN',
				},
			},
		});
		return count;

	} catch(error) {
		console.log({error})
		return 0
	}
}
