"use server";
import { signIn } from "@/auth";
import getUserByEmail from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { rateLimit, RateLimitError } from "@/lib/rate-limit";
import { generateverificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

/**
 * Authenticates a user with email and password
 * @param values - Login form data (email, password)
 * @param callbackUrl - Optional redirect URL after login
 * @returns Success or error response with optional redirect URL
 */
export const Login = async (
     values: z.infer<typeof LoginSchema>,
     callbackUrl?: string | null,
) => {
     try {
          await rateLimit({
               key: `login:${values.email}`,
               limit: 3,
               window: 60,
          });
          const validatedFields = LoginSchema.safeParse(values);

          if (!validatedFields.success) {
               return { error: "Invalid fields!" };
          }

          const { email, password } = validatedFields.data;

          const existingUser = await getUserByEmail(email);

          if (!existingUser || !existingUser.email || !existingUser.password) {
               return { error: "Email does not exist!" };
          }

          if (!existingUser.emailVerified) {
               const verificationToken = await generateverificationToken(
                    existingUser.email,
               );

               await sendVerificationEmail(
                    verificationToken.email,
                    verificationToken.token,
               );

               return { success: "Confirmation email sent!" };
          }

          await signIn("credentials", {
               email,
               password,
               redirect: false,
          });
          return {
               success: "Successfully Signed in!",
               redirectUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
          };
     } catch (error) {
          console.log("Error in Login:", error);
          if (error instanceof AuthError) {
               switch (error.type) {
                    case "CredentialsSignin":
                         return { error: "Incorrect email or password" };
                    default:
                         return { error: "Something went wrong!" };
               }
          } else if (error instanceof RateLimitError) {
               return { error: error.message };
          }

          if (process.env.NODE_ENV !== "production") {
               console.error("Error in Login:", error);
          }
          return { error: "An unexpected error occurred!" };
     }
};
