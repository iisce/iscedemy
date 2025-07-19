"use server";
import getUserByEmail from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { onBoardingMail } from "@/lib/mail";

/**
 * Verifies a user's email using a verification token
 * @param token - Verification token
 * @returns Success or error response
 */
export async function newVerification(token: string) {
     try {
          const existingToken = await getVerificationTokenByToken(token);

          if (!existingToken) {
               return { error: "Token does not exist" };
          }

          const hasExpired = new Date(existingToken.expires) < new Date();

          if (hasExpired) {
               return { error: "Token has expired" };
          }

          const existingUser = await getUserByEmail(existingToken.email);

          if (!existingUser) {
               return { error: "Email does not exist!" };
          }

          await db.user.update({
               where: { id: existingUser.id },
               data: {
                    emailVerified: new Date(),
                    email: existingToken.email,
                    isVerified: true,
               },
          });

          await db.verificationToken.delete({
               where: { id: existingToken.id },
          });

          if (existingUser.email && existingUser.name) {
               await onBoardingMail(existingUser.email, existingUser.name);
          } else {
               if (process.env.NODE_ENV !== "production") {
                    console.error(
                         "User email or name not found, cannot send onboarding email",
                    );
               }
          }
          return { success: "Email verified" };
     } catch (error) {
          if (process.env.NODE_ENV !== "production") {
               console.error("Error in newVerification:", error);
          }
          return { error: "An error occurred. Please try again." };
     }
}
