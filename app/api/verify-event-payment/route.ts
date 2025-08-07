// app/api/verify-payment/route.ts

import { db } from "@/lib/db";
import { verifyTransaction } from "@/actions/paystack";
import { studentNotificationMail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     try {
          const { reference, transactionId } = await request.json();

          const result = await verifyTransaction(reference);
          if (result.error) {
               return NextResponse.json(
                    { error: result.error },
                    { status: 400 },
               );
          }

          const transaction = await db.eventPayment.findFirst({
               where: { transactionId: reference },
               include: { User: true },
          });

          if (!transaction) {
               console.error("Transaction not found in EventPayment:", {
                    reference,
               });
               return NextResponse.json(
                    { error: "Transaction not found" },
                    { status: 404 },
               );
          }

          if (transaction.status === "SUCCESSFUL") {
               console.log("Transaction already verified:", { reference });
               return new NextResponse(
                    JSON.stringify({
                         success: "Transaction already verified",
                         status: "CONFIRMED",
                    }),
                    {
                         status: 200,
                         headers: {
                              "Cache-Control":
                                   "no-store, no-cache, must-revalidate, proxy-revalidate",
                              "Content-Type": "application/json",
                         },
                    },
               );
          }
          await db.coursePayment.update({
               where: { id: transactionId },
               data: { status: "SUCCESSFUL", verifiedAt: new Date() },
          });
          console.log("Updated EventPayment to SUCCESSFUL:", {
               id: transaction.id,
          });

          const registrant = await db.awarenessProgramRegistration.findFirst({
               where: { email: transaction.userId },
          });
          console.log("Registrant query result:", registrant);

          if (registrant) {
               await db.awarenessProgramRegistration.update({
                    where: { id: registrant.id },
                    data: { status: "confirmed" },
               });
               console.log("Updated registration to confirmed:", {
                    email: transaction.User.email,
               });

               await studentNotificationMail(
                    registrant.fullName,
                    registrant.email,
                    "support@palmtechniq.com",
                    "AI Awareness Program 2025",
               );
               console.log("Sent confirmation email to:", registrant.email);
          } else {
               console.warn(
                    "No registrant found for email:",
                    transaction.User.email,
               );
          }

          return new NextResponse(
               JSON.stringify({
                    success: "Transaction Verified",
                    status: "CONFIRMED",
               }),
               {
                    status: 200,
                    headers: {
                         "Cache-Control":
                              "no-store, no-cache, must-revalidate, proxy-revalidate",
                         "Content-Type": "application/json",
                    },
               },
          );
     } catch (error) {
          console.error("Error verifying event payment:", error);
          return NextResponse.json(
               { error: "Error verifying transaction" },
               { status: 500 },
          );
     } finally {
          await db.$disconnect();
     }
}
