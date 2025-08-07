"use server";

import { db } from "@/lib/db";
import { PurchaseCourseSchema } from "@/schemas";
import * as z from "zod";
import { createTransaction } from "./paystack";

export async function initiatePayment(
     paymentData: z.infer<typeof PurchaseCourseSchema>,
) {
     const validatedFields = PurchaseCourseSchema.safeParse(paymentData);
     if (!validatedFields.success) {
          return { error: "Invalid fields!" };
     }

     const { courseId, type, userId, includeCertificate } =
          validatedFields.data;

     let basePrice: number,
          additionalFees = 0;
     let course, event;

     try {
          // Fetch user
          const student = await db.user.findUnique({ where: { id: userId } });
          if (!student || !student.email) {
               return { error: "No student found or missing email" };
          }

          // Handle event or course
          if (type === "event") {
               event = await db.event.findUnique({ where: { id: courseId } });
               if (!event) {
                    return { error: "No event with that ID found" };
               }
               basePrice = event.price * 100; // 5,000 Naira in kobo
          } else {
               course = await db.course.findUnique({ where: { id: courseId } });
               if (!course) {
                    return { error: "No course with that ID found" };
               }
               basePrice =
                    type.toLowerCase() === "physical"
                         ? course.physicalPrice * 100
                         : course.virtualPrice * 100;
               if (includeCertificate !== false) {
                    additionalFees += 500000; // Certificate fee in kobo
               }
               if (!student.hasStudentId) {
                    additionalFees += 1500000; // Student ID fee in kobo
               }
          }

          const amount = basePrice + additionalFees;
          const reference =
               type === "event"
                    ? `event-${courseId}-${Date.now()}`
                    : `course-${course?.title || "course"}-${Date.now()}`;

          // Create payment record
          let newTransaction;
          if (type === "event") {
               newTransaction = await db.eventPayment.create({
                    data: {
                         userId: student.id,
                         eventId: courseId,
                         currency: "NGN",
                         amount: amount / 100, // Store in Naira
                         status: "PENDING",
                         transactionId: reference,
                    },
               });
               console.log("Created EventPayment:", {
                    id: newTransaction.id,
                    transactionId: newTransaction.transactionId,
               });
          } else {
               newTransaction = await db.coursePayment.create({
                    data: {
                         userId: student.id,
                         courseId: courseId,
                         currency: "NGN",
                         amount: amount / 100, // Store in Naira
                         status: "PENDING",
                         transactionId: reference,
                    },
               });
               console.log("Created CoursePayment:", {
                    id: newTransaction.id,
                    transactionId: newTransaction.transactionId,
               });
          }

          const payload = {
               email: student.email,
               name: student.name,
               currency: "NGN",
               amount,
               reference,
               callback_url: `${process.env.NEXT_PUBLIC_URL}/${type === "event" ? "events/verify" : "courses/verify"}?id=${newTransaction.id}`,
               metadata: {
                    custom_fields: [
                         {
                              display_name:
                                   type === "event"
                                        ? "Event Title"
                                        : "Course Title",
                              variable_name:
                                   type === "event"
                                        ? "event_title"
                                        : "course_title",
                              value:
                                   type === "event"
                                        ? event?.title
                                        : course?.title,
                         },
                         {
                              display_name: "Customer Name",
                              variable_name: "customer_name",
                              value: student.name,
                         },
                         {
                              display_name: "Customer Phone",
                              variable_name: "customer_phone",
                              value: student.phone || "Not provided",
                         },
                         {
                              display_name: "Type",
                              variable_name:
                                   type === "event"
                                        ? "event_type"
                                        : "course_type",
                              value: type,
                         },
                         {
                              display_name: "Amount",
                              variable_name: "amount",
                              value: amount / 100,
                         },
                         {
                              display_name: "Additional Fees",
                              variable_name: "additional_fees",
                              value: additionalFees / 100,
                         },
                    ],
               },
          };
          console.log("Paystack payload:", payload);

          const createTransactionResponse = await createTransaction({
               payload,
          });
          if (createTransactionResponse.error) {
               return { error: createTransactionResponse.error };
          }

          return {
               success: createTransactionResponse.success,
               authorization_url:
                    createTransactionResponse.data.authorization_url,
               transactionId: newTransaction.transactionId,
          };
     } catch (error) {
          console.error("Error initializing Paystack transaction:", {
               message: error instanceof Error ? error.message : String(error),
               stack: error instanceof Error ? error.stack : undefined,
          });
          return { error: "Something went wrong" };
     } finally {
          await db.$disconnect();
     }
}
