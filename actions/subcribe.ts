"use server";
import { subscribeToNewsletter } from "@/lib/mail";
import { z } from "zod";
import { db } from "@/lib/db";
import { SubscribeSchema } from "@/schemas";

export const subscribe = async (formData: z.infer<typeof SubscribeSchema>) => {
     const validatedFields = SubscribeSchema.safeParse(formData);

     if (!validatedFields.success) {
          return { error: "Invalid email address!" };
     }

     const { email } = validatedFields.data;

     try {
          const subscriberResponse = await db.subscriber.create({
               data: { email },
          });

          const emailReseponse = await subscribeToNewsletter(
               subscriberResponse.email,
          );
          if (emailReseponse.error) {
               return { error: emailReseponse.error };
          }
          return { success: "Your roadmap has been shipped to you!!" };
     } catch {
          return { error: "Something went wrong, please try again later." };
     }
};
