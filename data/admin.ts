import { db } from "@/lib/db";

// This function is used to get the total earnings for all courses
export async function getTotalEarnings() {
    try {
        const totalEarnings = await db.coursePayment.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                status: 'SUCCESSFUL',
            },
        });
        return totalEarnings._sum.amount || 0;
    } catch (error) {
        console.log ({error});
        return 0;
    }
}

// This function is used to get the total number of courses
export async function getTotalCourses() {
    try {
        const totalCourses = await db.course.count();
        return totalCourses;
    } catch (error) {
        console.log({error});
        return 0;
    }
}

// This function is used to get the total number of successful registrations across all courses
export async function getTotalRegistrations(){
    try {
        const totalRegistrations = await db.coursePayment.count({
            where: {
                status: 'SUCCESSFUL',
            },
        });
        return totalRegistrations;
    } catch(error) {
        console.log({error});
        return 0;
    }
}

//This function is used to get total nuumber of tutors
export async function getTotalTutors(){
    try{
        const totalTutors = await db.user.count({
            where: {
                role: 'TUTOR',
            },
        });
        return totalTutors
    }catch (error) {
        console.log({error});
        return 0;
    }
}

// This function is used to get total number of courses handled by tutors
export async function getTutorCourses() {
    try {
        const tutorCourses = await db.course.count();
        return tutorCourses;
    } catch (error) {
        console.log({ error });
        return 0;
    }
}

//This function is to get total number of student per tutor
export async function getStudentsPerTutor() {
    try {
        const tutors = await db.user.findMany({
            where: {
                role: 'TUTOR',
            },
            include: {
             Course: true
            },
        });

        let totalStudentsPerTutor = 0;

        for (const tutor of tutors) {
            const courseIds = tutor.Course.map((course: { id: string; }) => course.id);
            const students = await db.coursePayment.count({
                where: {
                    courseId: {
                        in: courseIds,
                    },
                    status: 'SUCCESSFUL',
                },
            });
            totalStudentsPerTutor += students;
           
          }
          return totalStudentsPerTutor / tutors.length;
    }catch (error) {
        console.log({error});
        return 0;
    }
}