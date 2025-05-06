/**
 * Handles the process of becoming a tutor by validating input fields, 
 * sending an email notification, and storing the application in the database.
 *
 * @param values - The input values to be validated and processed, adhering to the `TutorRegisterSchema`.
 * 
 * @returns A promise that resolves to an object containing either:
 * - `success`: A success message and the created application data if the process is successful.
 * - `error`: An error message if validation fails or an exception occurs during processing.
 *
 * @throws Will log errors to the console if email sending or database operations fail.
 *
 * @remarks
 * - This function uses the `resend` library to send emails.
 * - It uses Prisma ORM to interact with the database.
 * - Ensure that the environment variables `RESEND_API_KEY`, `FROM_EMAIL_ADDRESS`, and `TO_EMAIL_ADDRESS` are set.
 * - The database connection is properly closed in the `finally` block.
 */
'use server'
import { Resend } from 'resend';
import * as z from 'zod';
import { TutorRegisterSchema } from '../schemas'
import { PrismaClient } from '@prisma/client';


const resend = new Resend(process.env.RESEND_API_KEY)

export const BecomeTutor = async (values: z.infer<typeof TutorRegisterSchema>) => {
    const validatedFields = TutorRegisterSchema.safeParse(values);

    const prisma = new PrismaClient();

    if(!validatedFields.success) {
        return {error: 'Invalid fields!'};
    }

    const {fullname, email, phone, course, coverletter, uploadcv } = validatedFields.data
    console.log("Uploaded CV URL:", uploadcv)
    try {
        const employContent = 
        `
        Fullname: ${fullname}
        Email: ${email}
        Phone Number: ${phone}
        Cover Letter: ${coverletter}
        CV: ${uploadcv}
        Course: ${course}
        
        `;

        await resend.emails.send({
            from: process.env.FROM_EMAIL_ADDRESS!,
            to: process.env.TO_EMAIL_ADDRESS!,
            subject: 'Become A Tutor Application',
            text: employContent,
        });

        const application = await prisma.tutorApplication.create({
            data:{
                fullname,
                email,
                phone,
                course,
                coverletter,
                uploadcv
            },
        });

        console.log('Application successful:', application);
        return {
            success: 'Application Successful!',
            data: application
        };
    } catch (error) {
        console.error('Error processing tutor application:', error)
        return {error: 'Failed to process application. Please try again later.'};
    } finally {
        await prisma.$disconnect();
    }
};
