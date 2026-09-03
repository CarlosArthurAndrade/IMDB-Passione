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

export async function CreateRequestEmail(
    userEmail: string,
    movieName: string,
) {

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({

        from: process.env.EMAIL,

        to: 'Arthurandrade918@gmail.com',

        subject: "Novo pedido de filme adicionado",

        html: `
            <p>Solicitação para adicionar o filme ${movieName} ao catálogo</p>
            <p>pedido feito por: ${userEmail}</p>
        `
    });
}

export async function DeleteRequesttEmail(
    userEmail: string,
    movieName: string,
) {

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({

        from: process.env.EMAIL,

        to: `${userEmail}`,

        subject: "Seu filme solicitado foi adicionado",

        html: `
            <p>Novo filme ${movieName} adicionado ao catálogo</p>
        `
    });
}