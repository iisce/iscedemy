'use server';
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import getUserByEmail from '@/data/user';
import { generateverificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, name, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
        return { error: "Email already in use!" };
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    const verificationToken = await generateverificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );


    return { success: 'Confirmation email sent!'};
};