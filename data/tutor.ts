import { db } from "@/lib/db";

// Function to get all courses by a specific tutor
export async function getAllCoursesByTutor(tutorId: string) {
    try {
        const courses = await db.course.findMany({
            where: {tutorId},
            orderBy: {title: 'desc'},
        });
        return courses;
    } catch (error) {
        console.log({error});
        return [];
    }
}

// Function to get total earnings for a specific course
export async function getEarningsForCourse(courseId : string) {
    try {
        const totalEarnings = await db.coursePayment.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                courseId: courseId,
                status: 'SUCCESSFUL',
            },
        });
        return totalEarnings._sum.amount || 0;
    } catch (error) {
        console.log({error});
        return 0;
    }
}

//Function to get total number of students enrolled successfully for a course
export async function getEnrollmentsForCourse(courseId: string) {
    try {
        const count = await db.coursePayment.count({
            where: {
                courseId: courseId,
                status: 'SUCCESSFUL'
            }
        });
        return count;
    } catch (error) {
        console.log({error});
        return 0;
    } 
}