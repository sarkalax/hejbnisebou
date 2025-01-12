import { z } from 'astro/zod';
import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';

const defaultMessage = "Toto pole je povinné";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    contactForm: defineAction({
        accept: "form",
        input: z.object({
            name: z.string().min(1, { message: defaultMessage }),
            email: z.string().email({ message: defaultMessage }),
            message: z.string().min(1, { message: defaultMessage }),
        }),
        handler: async (formData) => {
            const { error } = await resend.emails.send({
                from: "Hejbnisebou <kontakt@hejbnisebou.cz>",
                replyTo: formData.email,
                to: import.meta.env.CONTACT_EMAIL,
                subject: "Kontaktní formulář - web",
                html: formData.message,
            });
            if (error) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: error.message,
                });
            }
            return { status: 200, body: "Success" };
        },
    }),
};
