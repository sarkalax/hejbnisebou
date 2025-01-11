import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const sendEmail = async function sendEmail() {
    try {
        const response = await resend.emails.send({
            from: "your@email.com",
            to: import.meta.env.CONTACT_EMAIL,
            subject: "Hello from Resend!",
            html: "<strong>This is a test email.</strong>",
        });
        console.log("Email sent:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
