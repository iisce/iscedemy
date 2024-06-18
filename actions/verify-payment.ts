"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { verifyTransaction } from "./paystack";
import { getUserById } from "@/data/user";
import { getCourseById } from "@/data/course";

export async function verifyPayment(reference: string) {
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

	  if (transaction.status === 'SUCCESSFUL' ) {
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

	//   let existingCourses = buyer.courses

	//   if(existingCourses) {
	// 	existingCourses = existingCourses.concat('---',transaction.courseId) 
	//   } else {
	// 	existingCourses=transaction.courseId
	//   }

	const registeredCourses = buyer.courses? `${buyer.courses}---${transaction.courseId}`: transaction.courseId

	console.log({registeredCourses})

	  await db.user.update({
		where : {id: buyer.id},
		data: {courses: registeredCourses},
	  })
      revalidatePath(`/courses/${courseTitle}`);

      return { success: "Transaction Verified" || ''};
    }
  } catch (error) {
    console.error("Error verifying payment:", error);

    return { error: "Error verifying transaction." };
  }
}
