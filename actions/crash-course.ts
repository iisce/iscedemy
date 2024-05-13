'use server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';
import { CourseRegisterSchema } from '@/schemas';
import * as z from 'zod';


const resend = new Resend(process.env.RESEND_API_KEY)
const chatLink = `https://wa.me/+2348163453826`;

export const CrashCourse = async (values: z.infer<typeof CourseRegisterSchema>) => {
    const validatedFields = CourseRegisterSchema.safeParse(values);

    const prisma = new PrismaClient();

    /**
     * This checks if the available fields are of type success message; 
     * if not it return/throws error message invalid fields i.e if there are no 
     * error message assigned the the form 
     * else it uses the error message in the form and displays it to the users based on what they need to do 
     * before submitting     
     */
    if (!validatedFields.success) {
        return { error: 'Invalid fields!'};
    }

    /**This constant gets the validated fields in registration form and sends the submitted information to 
     * the provided TO_EMAIL_ADDRESS.
     * It first checks for error catches the error and displays it to the user else it displays a SUCCCESS message if there are no error.
     */
    try {
        const emailContent = `
        Firstname: ${validatedFields.data.firstname}
        Lastname: ${validatedFields.data.lastname}
        Email: ${validatedFields.data.email}
        Course: ${validatedFields.data.course}
        Occupation: ${validatedFields.data.occupation}
        Expectations: ${validatedFields.data.expectations}
        `;

        await resend.emails.send({
            from: process.env.FROM_EMAIL_ADDRESS!,
            to: process.env.TO_EMAIL_ADDRESS!,
            subject: 'Crash Course Registration',
            text: emailContent,
        });

        /**
         * This await req sends back a reply to the previously sent email.
         * It uses the users email address and takes the first name of the user and 
         * sends the reply message
         */
        await resend.emails.send({
            from: process.env.FROM_EMAIL_ADDRESS!,
            to: validatedFields.data.email,
            subject: 'Crash Course Registration',
            text: `Dear ${validatedFields.data.firstname}
            Thank you for registering for the Crash Course! We've received your registration.
            `,

        });

            const registration = await prisma.courseRegistration.create({ 
                data: {
                  firstname: validatedFields.data.firstname,
                  lastname: validatedFields.data.lastname,
                  email: validatedFields.data.email,
                  occupation: validatedFields.data.occupation,
                  course: validatedFields.data.course
                }
            })
        
        
        /**The return statement either success or error displays after the 
         * form must have checked for errors and found non or found some
         * the CATCH catches the error and displays it to the user else it displays the SUCCESS message.
         */
        return { success: 'Registration successful! An acknowledgment email has been sent to you!' };
    } catch (error) {
        console.error('Error sending email:', error);
        return {error: 'An error occurred while submitting. Please try again. Or check your internet connection.'}
    };
}



