"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import {
     adminNotificationMail,
     studentNotificationMail,
     tutorNotificationMail,
} from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { verifyTransaction } from "./paystack";
import { splitPayment } from "./split-payment";

export async function verifyPayment(
     reference: string,
     tutorId?: string,
     studentName?: string,
     courseName?: string,
) {
     if (!reference) {
          console.error("Transaction reference not found");
          return { error: "Transaction reference not found" };
     }

     try {
          const result = await verifyTransaction(reference);
          console.log(result);

          if (result.error) {
               console.error("Error verifying transaction:", result.error);
               return { error: result.error };
          } else {
               const courseTitle = reference.split("-")[1];

               const transaction = await db.coursePayment.findFirst({
                    where: { transactionId: reference },
                    include: { Course: { include: { tutor: true } } },
               });

               if (!transaction) {
                    console.error("Transaction not found in the database");
                    return { error: "Transaction not found" };
               }

               if (transaction.status === "SUCCESSFUL") {
                    console.error("Transaction already verified");
                    return { error: "Transaction already verified" };
               }
               const tutor = transaction.Course.tutor;

               const admin = await db.user.findMany({
                    where: { role: "ADMIN" },
               });
               console.log("Admin users:", admin);
               const student = await getUserById(transaction.userId);
               const course = transaction.Course;

               if (!tutor || !student || !course) {
                    console.error(
                         "Tutor, student, or course information is missing.",
                    );
                    return { error: "Missing required data" };
               }

               // console.log("Student details:", {
               //      studentId: student.id,
               //      studentName: student.name,
               //      studentEmail: student.email,
               // });
               await studentNotificationMail(
                    student?.name!,
                    student?.email!,
                    tutor?.email!,
                    course.title,
               );

               // console.log("Tutor details:", {
               //      tutorId: tutor.id,
               //      tutorName: tutor.name,
               //      tutorEmail: tutor.email,
               // });
               await tutorNotificationMail(
                    tutor?.name!,
                    tutor?.email!,
                    student?.name!,
                    student?.email!,
                    course.title,
               );

               for (const a of admin) {
                    // console.log("Admin email:", a.email);
                    if (a.email) {
                         try {
                              await adminNotificationMail(
                                   a.email,
                                   tutor?.name!,
                                   tutor?.email!,
                                   student?.name!,
                                   student?.email!,
                                   course.title,
                              );
                              console.log(`Admin email sent to: ${a.email}`);
                         } catch (error) {
                              console.error(
                                   `Failed to send admin email to ${a.email}:`,
                                   error,
                              );
                         }
                    } else {
                         console.log("Skipping admin due to invalid email:", a);
                    }
               }

               if (
                    transaction.amount >=
                    (course.physicalPrice * 100 || course.virtualPrice * 100) +
                         1500000
               ) {
                    // Check if 15,000 Naira was part of the fee
                    await db.user.update({
                         where: { id: student.id },
                         data: { hasStudentId: true },
                    });
                    console.log(
                         "Student ID fee confirmed, updated hasStudentId to true for:",
                         student.id,
                    );
               }

               await db.coursePayment.update({
                    where: { id: transaction.id },
                    data: { status: "SUCCESSFUL" },
               });

               const registeredCourses = student.courses
                    ? `${student.courses}---${transaction.courseId}`
                    : transaction.courseId;
               console.log({ registeredCourses });

               await db.user.update({
                    where: { id: student.id },
                    data: { courses: registeredCourses, role: "STUDENT" },
               });

               const splitResult = await splitPayment(
                    transaction.amount,
                    tutor.id,
                    transaction.id,
               );
               if (splitResult.error) {
                    console.error("Payment split failed:", splitResult.error);
                    return { error: splitResult.error };
               }

               const netTutorAmount =
                    transaction.amount * 0.4 -
                    (transaction.amount * 0.4 * 0.015 + 100); // Recalculate for accuracy
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

               return { success: "Transaction Verified" };
          }
     } catch (error) {
          console.error("Error verifying payment:", error);
          return { error: "Error verifying transaction." };
     }
}
