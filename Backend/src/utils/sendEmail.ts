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
    releaseYear: string,
    description: string
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
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <link href="https://googleapis.com" rel="stylesheet">
            </head>
        <body style="
            font-family: Lato, sans-serif;
            background-color: #5D3FD3;
            padding: 20px;
        ">
            <div style="
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffff;
                border-radius: 8px;
            ">
                <div style="
                    border: 1px solid #ffffff;
                    padding: 10px;
                    box-sizing: border-box;
                    border-radius: 15px 15px 0px 0px
                ">
                    <h1 style="font-size: 24px;">
                        Nova solicitação de filme
                    </h1>
                    <p>
                        Uma nova solicitação de filme foi recebida.
                    </p>
                </div>

                <div style="
                    border: 1px solid #ffffff;
                    padding: 10px;
                    box-sizing: border-box;
                    border-radius: 0px 0px 15px 15px
                ">
                    <p>
                        <strong>Email do solicitante:</strong> ${userEmail}
                    </p>

                    <p>
                        <strong>Filme solicitado:</strong> ${movieName}
                    </p>

                    <p>
                        <strong>Ano de lançamento:</strong> ${releaseYear}
                    </p>

                    ${description && 
                        `
                        <p>
                            <strong>Descrição</strong> ${description}
                        </p>
                        `
                    }
                </div>
            </div>
        </body>
        </html>
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