'use server'
import { signIn } from '@/auth';
import getUserByEmail from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateverificationToken } from '@/lib/token';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod'

export const Login = async (values: z.infer<typeof LoginSchema>, callBackUrl?: string | null,) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!'};
    }
    
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    } 

    if (!existingUser.emailVerified) {
        const verificationToken = await generateverificationToken(
            existingUser.email,
        );
        
        await sendVerificationEmail(
            verificationToken.id,
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Confirmation email sent!" }
    }

    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: callBackUrl ||  DEFAULT_LOGIN_REDIRECT,
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin" :
                    return {error: "Invalid credentials"}
                    default: 
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
}

