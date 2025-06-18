"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { tutorNotificationMail } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { verifyTransaction } from "./paystack";
import { splitPayment } from "./split-payment";

export async function verifyPayment(reference: string, tutorId?: string, studentName?: string, courseName?: string) {
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
        include: {Course: {include: {tutor: true}}},
      });

      if (!transaction) {
        console.error("Transaction not found in the database");
        return { error: "Transaction not found"};
      }

      if(transaction.status === 'SUCCESSFUL') {
        console.error("Transaction already verified");
        return { error: "Transaction already verified" };
      }
      const tutor = transaction.Course.tutor;
      const student = await getUserById(transaction.userId);
      const course = transaction.Course;

      if(!tutor || !student || !course) {
      console.error("Tutor, student, or course information is missing.");
      return { error: "Missing required data" };
      }

      
      await tutorNotificationMail(tutor?.name!, student?.name! ,tutor?.email!, course.title)
 

      await db.coursePayment.update({
        where: { id: transaction.id },
        data: { status: "SUCCESSFUL" },
      });

	const registeredCourses = student.courses? `${student.courses}---${transaction.courseId}`: transaction.courseId
	console.log({registeredCourses})

	  await db.user.update({
		where : {id: student.id},
		data: {courses: registeredCourses, role: 'STUDENT'},
	  });

    const splitResult = await splitPayment(transaction.amount, tutor.id, transaction.id);
    if(splitResult.error) {
       console.error("Payment split failed:", splitResult.error);
      return { error: splitResult.error };
    }

     const netTutorAmount = (transaction.amount * 0.40) - ((transaction.amount * 0.40 * 0.015) + 100); // Recalculate for accuracy
        await db.transaction.create({
          data: {
            userId: tutor.id,
            courseId: transaction.courseId,
            type: "Course Payment",
            amount: netTutorAmount,
            status: "success",
            createdAt: new Date(),
          },
        });

      revalidatePath(`/courses/${courseTitle}`);

      return { success: "Transaction Verified"};
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return { error: "Error verifying transaction." };
  }
}
