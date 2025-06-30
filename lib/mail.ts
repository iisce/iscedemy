import { Resend } from "resend";
import EmailVerification from "./email-verification";
import EmailNewsLetter from "./newsletter-subs";
import PasswordReset from "./password-reset";
import SignIn from "./signin";
import tutorNotification from "./tutor-notification";
import adminNotification from "./admin-notification";
import studentNotification from "./student-notification";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_732KJ3em_21Vu3jkWV1ZtG22rxLcyYdAH");

const domain = process.env.NEXT_PUBLIC_URL;

export const sendPasswordResetToken = async (email: string, token: string) => {
     const resetLink = `${domain}/new-password?token=${token}`;

     await resend.emails.send({
          from: process.env.FROM_EMAIL_ADDRESS!,
          to: email,
          subject: "Password Reset",
          react: PasswordReset({ email, token }),
     });
};
export const sendVerificationEmail = async (email: string, token: string) => {
     const confrimLink = `${domain}/new-verification?token=${token}`;

     await resend.emails.send({
          from: process.env.FROM_EMAIL_ADDRESS!,
          to: email,
          subject: "Confirm your email",
          react: EmailVerification({ email, token }),
     });
};

export const subscribeToNewsletter = async (email: string) => {
     try {
          await resend.emails.send({
               from: process.env.FROM_EMAIL_ADDRESS!,
               to: email,
               subject: "Welcome to our newsletter system",
               react: EmailNewsLetter({ email }),
          });
          return { success: "Subcribed successfully!" };
     } catch (error) {
          console.error("Error subcribing to newsletter!", error);
          return { error: "Subcription failed! Try again" };
     }
};
export const onBoardingMail = async (email: string, fullName: string) => {
     try {
          await resend.emails.send({
               from: process.env.FROM_EMAIL_ADDRESS!,
               to: email,
               subject: "Welcome to PalmTechnIQ",
               react: SignIn({ fullName }),
          });
          return { success: "Signed-Up successfully!" };
     } catch (error) {
          console.error("Error creating account!", error);
          return { error: "Account Creation failed! Try again" };
     }
};

export const studentNotificationMail = async (
     studentName: string,
     studentEmail: string,
     tutorEmail: string,
     courseName: string,
) => {
     try {
          // console.log("Attempting to send student email to:", studentEmail);
          // console.log("Student email params:", {
          //      studentName,
          //      studentEmail,
          //      tutorEmail,
          //      courseName,
          // });
          const response = await resend.emails.send({
               from: process.env.FROM_EMAIL_ADDRESS!,
               to: studentEmail,
               subject: "Welcome to Your New Course at PalmTechnIQ!",
               react: studentNotification({
                    studentName,
                    tutorEmail,
                    courseName,
               }),
          });
          console.log("Resend student response:", response);
          return { success: "Email sent successfully!" };
     } catch (error) {
          console.error(
               "Error sending student email to",
               studentEmail,
               ":",
               error,
          );
          return { error: "Email sending failed! Try again" };
     }
};

export const tutorNotificationMail = async (
     tutorName: string,
     tutorEmail: string,
     studentName: string,
     studentEmail: string,
     courseName: string,
) => {
     try {
          await resend.emails.send({
               from: process.env.FROM_EMAIL_ADDRESS!,
               to: tutorEmail,
               subject: "You have a new student!!",
               react: tutorNotification({
                    tutorName,
                    tutorEmail,
                    studentName,
                    studentEmail,
                    courseName,
               }),
          });
          return { success: "Signed-Up successfully!" };
     } catch (error) {
          console.error("Error creating account!", error);
          return { error: "Account Creation failed! Try again" };
     }
};
export const adminNotificationMail = async (
     adminEmail: string,
     tutorName: string,
     tutorEmail: string,
     studentName: string,
     studentEmail: string,
     courseName: string,
) => {
     try {
          // console.log("Attempting to send admin email to:", adminEmail);
          // console.log("Email params:", {
          //      adminEmail,
          //      tutorName,
          //      tutorEmail,
          //      studentName,
          //      studentEmail,
          //      courseName,
          // });
          await resend.emails.send({
               from: process.env.FROM_EMAIL_ADDRESS!,
               to: adminEmail,
               subject: "A new student just onboarded!!",
               react: adminNotification({
                    admin: adminEmail,
                    tutorEmail,
                    tutorName,
                    studentName,
                    studentEmail,
                    courseName,
               }),
               reply_to: process.env.FROM_EMAIL_ADDRESS,
          });
          console.log("Admin email sent successfully to:", adminEmail);
          return { success: "Signed-Up successfully!" };
     } catch (error) {
          console.error("Error sending admin email to", adminEmail, ":", error);
          return { error: "Email sending failed! Try again" };
     }
};
