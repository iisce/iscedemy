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
        const totalEarnings = await db.transaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                courseId: courseId,
                status: 'success',
                type: 'Course Payment',
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

export async function calculateTotalEarnings(tutorId: string){
    const total = await db.transaction.aggregate({
        _sum: {amount: true},
        where: {userId: tutorId, status: 'success', type: 'Course Payment'},
    });
    return total._sum.amount || 0;
}

export async function calculateMonthlyEarnings(tutorId: string){
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const total = await db.transaction.aggregate({
        _sum: {amount: true},
        where: {
            userId: tutorId, 
            status: 'success',
            type: 'Course Payment',
            createdAt: {gte: startOfMonth},
        },
    });
    return total._sum.amount || 0
}