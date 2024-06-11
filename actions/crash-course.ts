'use server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';
import { CourseRegisterSchema } from '@/schemas';
import * as z from 'zod';
import RegCrashCourse from '@/lib/reg-crashcourse';

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const {course,email,expectations,firstname,lastname,occupation} = validatedFields.data

    /**This constant gets the validated fields in registration form and sends the submitted information to 
     * the provided TO_EMAIL_ADDRESS.
     * It first checks for error catches the error and displays it to the user else it displays a SUCCCESS message if there are no error.
     */
    try {
        const emailContent = `
        Firstname: ${firstname}
        Lastname: ${lastname}
        Email: ${email}
        Course: ${course}
        Occupation: ${occupation}
        Expectations: ${expectations}
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
            react: RegCrashCourse({courseName: course,email, firstname})

        });

            const registration = await prisma.courseRegistration.create({ 
                data: {
                  firstname,
                  lastname,
                  email,
                  occupation,
                  course
                }
            })
        
        
        /**The return statement either success or error displays after the 
         * form must have checked for errors and found non or found some
         * the CATCH catches the error and displays it to the user else it displays the SUCCESS message.
         */
        return { 
            success: 'Registration successful! An acknowledgment email has been sent to you!',
            data: registration
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {error: 'An error occurred while submitting. Please try again. Or check your internet connection.'}
    };
}



