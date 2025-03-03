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

    const {fullname, email, phone, coverletter, uploadcv } = validatedFields.data
    console.log("Uploaded CV URL:", uploadcv)
    try {
        const employContent = 
        `
        Fullname: ${fullname}
        Email: ${email}
        Phone Number: ${phone}
        Cover Letter: ${coverletter}
        CV: ${uploadcv}
        
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
