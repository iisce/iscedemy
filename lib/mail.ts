import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confrimLink = `https://www.palmtechniq.com/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: process.env.FROM_EMAIL_ADDRESS!,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confrimLink}">here</a> to confirm email.</p>`
        
    })
}