'use server';
import { Resend } from 'resend';
import { CourseRegisterSchema } from '@/schemas';
import * as z from 'zod';


const resend = new Resend(process.env.RESEND_API_KEY)

export const CrashCourse = async (values: z.infer<typeof CourseRegisterSchema>) => {
    const validatedFields = CourseRegisterSchema.safeParse(values);


    if (!validatedFields.success) {
        return { error: 'Invalid fields!'};
    }
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
            from: 'onboarding@resend.dev',
            to: 'isceofficial@gmail.com',
            subject: 'Crash Course Registration',
            text: emailContent,
        });

        return { success: 'Email sent successfully!' };
    } catch (error) {
        console.error('Error sending email:', error);
        return {error: 'An error occurred while submitting. Please try again. Or check your internet connection.'}
    };
}

