// actions/paystack.ts

"use server";
import { db } from "@/lib/db";
import { PurchaseCourseSchema } from "@/schemas";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import * as z from "zod";

const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY_TEST!);

interface PaymentProps {
  email: string;
  amount: number;
  courseTitle: string;
  
}

export async function initiatePayment(paymentData: z.infer<typeof PurchaseCourseSchema>) {

    const validatedFields = PurchaseCourseSchema.safeParse(paymentData);

  if (!validatedFields.success) {
    throw new Error('Invalid fields!');
  }
  
  const { email, name,type, course: courseId } = validatedFields.data;
  const course = await db.course.findUnique({
    where: { id: courseId },
  });

  if (!course) return {error: 'No course with that ID found'}

  const coursePrice = type.toLowerCase() === 'physical'? course.physicalPrice * 100 : course.virtualPrice *100
  const reference = `course-${course.title}-${Date.now()}`
  try {
    const transaction = await paystack.transaction.initialize({
      email,
      courseId,
      type,
      amount: coursePrice,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/verify?reference=${reference}`,
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
            value: name,
          },
          {
            display_name: "Customer Phone",
            variable_name: "customer_phone",
          },
          {
            display_name: "Type",
            variable_name: "customer_type",
            value: coursePrice
          },
        ],
      },
    });

    await db.coursePayment.create({
      data: {
        userId: course.id,
        courseId: course.id,
        currency: '',
        amount: course.virtualPrice * 100,
        status: 'PENDING',
        transactionId: course.category,
      }
    })
    
    cookies().set("transactionReference", transaction.data.reference, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "development", 
    });

  } catch (error) {
    console.error("Error initializing Paystack transaction:", error);
    throw new Error(
      "An error occurred while processing your payment. Please try again later."
    );
  }
}

