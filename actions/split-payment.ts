"use server";

import { bankCodes } from "@/lib/bankcodes";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function splitPayment(
     amount: number,
     tutorId: string,
     transactionId: string,
) {
     const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
     if (!PAYSTACK_SECRET_KEY)
          throw new Error("Paystack secret key is not set");

     const tutor = await db.user.findUnique({
          where: { id: tutorId },
     });
     if (!tutor?.subaccountCode || !tutor.bankName || !tutor.accountNumber) {
          console.error("Tutor details missing:", tutor);
          throw new Error("Tutor subaccount  or bank details not found");
     }

     console.log("Split Payment Details:", {
          tutorId,
          subaccountCode: tutor.subaccountCode,
          bankName: tutor.bankName,
          accountNumber: tutor.accountNumber,
          transactionAmount: amount,
          transactionId,
     });

     const tutorSharePercentage = 0.4; // 40%
     const paystackChargePercentage = 0.015; // 1.5% (adjust based on Paystack plan)
     const flatFee = 100; // ₦100 flat fee (adjust as needed)

     // Calculate gross tutor amount
     const grossTutorAmount = amount * tutorSharePercentage;
     // Estimate Paystack charge (deducted from tutor's share)
     const paystackCharge =
          grossTutorAmount * paystackChargePercentage + flatFee;
     const netTutorAmount = grossTutorAmount - paystackCharge;
     const companyAmount = amount - grossTutorAmount;

     if (netTutorAmount < 0)
          throw new Error("Insufficient amount for tutor after charges");

     //   // Check Paystack balance
     const balanceResponse = await fetch("https://api.paystack.co/balance", {
          method: "GET",
          headers: {
               Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
               "Content-Type": "application/json",
          },
     });
     const balanceData = await balanceResponse.json();
     console.log("Paystack Balance:", balanceData);

     if (
          !balanceResponse.ok ||
          balanceData.data.available_balance < netTutorAmount * 100
     ) {
          console.error("Insufficient balance for transfer:", balanceData);
          return { error: "Insufficient balance in Paystack account" };
     }

     // Create or retrieve transfer recipient
     let recipientCode = tutor.recipientCode;
     if (!recipientCode) {
          const existingRecipientResponse = await fetch(
               `https://api.paystack.co/transferrecipient?account_number=${tutor.accountNumber}&bank_code=${bankCodes[tutor.bankName]}`,
               {
                    method: "GET",
                    headers: {
                         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                         "Content-Type": "application/json",
                    },
               },
          );

          const existingRecipientData = await existingRecipientResponse.json();

          if (
               existingRecipientData.status &&
               existingRecipientData.data.length > 0
          ) {
               recipientCode = existingRecipientData.data[0].recipient_code;
          } else {
               const recipientResponse = await fetch(
                    "https://api.paystack.co/transferrecipient",
                    {
                         method: "POST",
                         headers: {
                              Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              type: "nuban",
                              name: tutor.name,
                              account_number: tutor.accountNumber,
                              bank_code: bankCodes[tutor.bankName],
                              currency: "NGN",
                         }),
                    },
               );
               const recipientData = await recipientResponse.json();

               if (!recipientResponse.ok) {
                    console.error("Failed to create recipient:", recipientData);
                    return {
                         error:
                              recipientData.message ||
                              "Failed to create recipient",
                    };
               }

               recipientCode = recipientData.data.recipient_code;

               await db.user.update({
                    where: { id: tutorId },
                    data: { recipientCode },
               });
          }
     }

     // Transfer to tutor subaccount
     const transferResponse = await fetch("https://api.paystack.co/transfer", {
          method: "POST",
          headers: {
               Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               source: "balance",
               reason: `Course payment split for transaction ${transactionId}`,
               amount: Math.round(netTutorAmount * 100),
               recipient: recipientCode,
               currency: "NGN",
          }),
     });

     const transferData = await transferResponse.json();

     if (!transferResponse.ok) {
          console.error("Transfer failed:", {
               status: transferResponse.status,
               message: transferData.message,
               data: transferData.data,
               requestBody: {
                    source: "balance",
                    reason: `Course payment split for transaction ${transactionId}`,
                    amount: Math.round(netTutorAmount * 100),
                    recipient: recipientCode,
                    currency: "NGN",
               },
          });
          return {
               error: transferData.message || "Failed to transfer to tutor",
          };
     }

     console.log("Transfer successful:", transferData);

     // Update tutor wallet balance
     await db.user.update({
          where: { id: tutorId },
          data: { walletBalance: { increment: netTutorAmount } },
     });

     // Optionally log the company amount (handled manually or via Paystack balance)
     console.log(
          `Tutor received: ₦${netTutorAmount.toFixed(2)}, Company: ₦${companyAmount.toFixed(2)}`,
     );

     revalidatePath("/tutor/profile");
     return {
          success: `Payment split completed. Tutor: ₦${netTutorAmount.toFixed(2)}, Company: ₦${companyAmount.toFixed(2)}`,
     };
}
