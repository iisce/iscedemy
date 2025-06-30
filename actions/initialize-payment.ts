"use server";
import { db } from "@/lib/db";
import { PurchaseCourseSchema } from "@/schemas";
import * as z from "zod";
import { createTransaction } from "./paystack";

interface PaymentProps {
     email: string;
     amount: number;
     courseTitle: string;
}

export async function initiatePayment(
     paymentData: z.infer<typeof PurchaseCourseSchema>,
) {
     const validatedFields = PurchaseCourseSchema.safeParse(paymentData);

     if (!validatedFields.success) {
          return { error: "Invalid fields!" };
     }

     const { courseId, type, userId, includeCertificate } =
          validatedFields.data;

     const course = await db.course.findUnique({
          where: { id: courseId },
     });
     if (!course) return { error: "No course with that ID found" };

     const student = await db.user.findUnique({
          where: { id: userId },
     });
     if (!student) return { error: "No student found" };

     let basePrice =
          type.toLowerCase() === "physical"
               ? course.physicalPrice * 100
               : course.virtualPrice * 100;
     let additionalFees = 0;

     if (!student.hasStudentId) {
          additionalFees += 1500000;
     }

     if (includeCertificate !== false) {
          additionalFees += 500000;
     }

     const coursePrice = basePrice + additionalFees;

     const reference = `course-${course.title}-${Date.now()}`;
     try {
          const newTransaction = await db.coursePayment.create({
               data: {
                    userId: student.id,
                    courseId: course.id,
                    currency: "NGN",
                    amount: coursePrice,
                    status: "PENDING",
                    transactionId: reference,
               },
          });

          const payload = {
               email: student.email,
               name: student.name,
               currency: "NGN",
               amount: newTransaction.amount,
               reference: newTransaction.transactionId,
               callback_url: `${process.env.NEXT_PUBLIC_URL}/courses/verify?id=${newTransaction.id}`,
               metadata: {
                    custom_fields: [
                         {
                              display_name: "Course Title",
                              variable_name: "course_title",
                              value: course.title,
                         },
                         {
                              display_name: "Customer Name",
                              variable_name: "customer_name",
                              value: student.name,
                         },
                         {
                              display_name: "Customer Phone",
                              variable_name: "customer_phone",
                              value: student.phone,
                         },
                         {
                              display_name: "Type",
                              variable_name: "course_type",
                              value: type,
                         },
                         {
                              display_name: "Amount",
                              variable_name: "course_amount",
                              value: basePrice / 100,
                         },
                         {
                              display_name: "Additional Fees",
                              variable_name: "additional_fees",
                              value: additionalFees / 100,
                         },
                         {
                              display_name: "Includes Student ID",
                              variable_name: "includes_student_id",
                              value: !student.hasStudentId
                                   ? "15,000 Naira (one-time)"
                                   : "0 Naira",
                         },
                         {
                              display_name: "Includes Certificate",
                              variable_name: "includes_certificate",
                              value:
                                   includeCertificate !== false
                                        ? "5,000 Naira"
                                        : "0 Naira",
                         },
                    ],
               },
          };
          const createTransactionResponse = await createTransaction({
               payload,
          });

          if (createTransactionResponse.error) {
               return { error: createTransactionResponse.error };
          } else {
               return {
                    success: createTransactionResponse.success,
                    authorization_url:
                         createTransactionResponse.data.authorization_url,
               };
          }
     } catch (error) {
          console.error("Error initializing Paystack transaction:", error);
          return { error: "something went wrong" };
     }
}
