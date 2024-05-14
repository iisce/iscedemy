import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_URL;

export const sendPasswordResetToken= async (
    email: string,
    token: string
) => {
    const resetLink = `${domain}/new-password?token=${token}`;

    await resend.emails.send({
        from: process.env.FROM_EMAIL_ADDRESS!,
        to: email,
        subject: "Password Reset",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        
    })
}
export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confrimLink = `${domain}/new-verification?token=${token}`;

    await resend.emails.send({
        from: process.env.FROM_EMAIL_ADDRESS!,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confrimLink}">here</a> to confirm email.</p>`
        
    })
}

export const subscribeToNewsletter = async (email: string) => {
    try {
        await resend.emails.send({
            from: process.env.FROM_EMAIL_ADDRESS!,
            to: email,
            subject: "Welcome to our newsletter system",
            html: `<p>Thank you for subscribing to our newsletter! You'll now receive our latest updates and news.</p>`,
        });
        return { success: "Subcribed successfully!"};
    } catch (error) {
        console.error('Error subcribing to newsletter!', error);
        return {error: "Subcription failed! Try again"};
    }
};