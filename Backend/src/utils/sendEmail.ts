import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'

dotenv.config({ quiet: true });

export async function CreateResetEmail(
    email: string,
    token: string
) {

    const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        }
    });
    const link =
        `http://localhost:3000/resetPassword/${token}`;

    await transporter.sendMail({

        from: process.env.EMAIL,

        to: email,

        subject: "Recuperação de senha",

        html: `
            <h2>Recuperação de senha</h2>

            <p>Clique no link abaixo:</p>

            <a href="${link}">
                Recuperar senha
            </a>

            <p>Este link expira em 30 minutos.</p>
        `
    });
}