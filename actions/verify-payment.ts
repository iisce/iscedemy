"use server";
import { getCourseById } from "@/data/course";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifyTransaction } from "./paystack";
import { tutorNotificationMail } from "@/lib/mail";
import { getTutorById } from "./tutor";

export async function verifyPayment(reference: string, tutorId: string, studentName: string, courseName: string) {
  if (!reference) {
    console.error("Transaction reference not found");
    return { error: "Transaction reference not found" };
  }

  try {
    const result = await verifyTransaction(reference);
	console.log(result)

    if (result.error) {
      console.error("Error verifying transaction:", result.error);
      return { error: result.error };
    } else {
      const courseTitle = reference.split("-")[1];

      const transaction = await db.coursePayment.findFirst({
        where: { transactionId: reference },
      });

      if (!transaction) {
        console.error("Transaction not found in the database");
        return { error: "Transaction not found"};
      }

      const tutor = await getTutorById(tutorId)
      const student = await getUserById(studentName)
      const course = await getCourseById(courseName)
	  if (transaction.status === 'SUCCESSFUL' ) {
      await tutorNotificationMail(tutor?.name!, student?.name! ,tutor?.email!, course?.title!)
		return {error: 'Attempting Duplication transaction!'}
	  }

	  const buyer = await getUserById(transaction.userId)
	  if (!buyer) {
		return{ error: "No user with this ID found! Purchase a course"}
	  }

	  const  purchaseCourse = await getCourseById(transaction.courseId)

	  if (!purchaseCourse) {
		return {error: "No course with this ID!"}
	  }

      await db.coursePayment.update({
        where: { id: transaction.id },
        data: { status: "SUCCESSFUL" },
      });

	const registeredCourses = buyer.courses? `${buyer.courses}---${transaction.courseId}`: transaction.courseId

	console.log({registeredCourses})

	  await db.user.update({
		where : {id: buyer.id},
		data: {courses: registeredCourses, role: 'STUDENT'},
	  })
      revalidatePath(`/courses/${courseTitle}`);

      return { success: "Transaction Verified" || ''};
    }
  } catch (error) {
    console.error("Error verifying payment:", error);

    return { error: "Error verifying transaction." };
  }
}
