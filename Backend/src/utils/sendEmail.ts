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
                background-color: #383D40;
                border-radius: 8px;
            ">
                <div style="
                    padding: 10px;
                    box-sizing: border-box;
                ">
                    <h1 style="font-size: 24px; text-align: center; color: white;"  align="center">
                        Nova solicitação de filme
                    </h1>
                    <p style="text-align: center; color: white;"  align="center">
                        Uma nova solicitação de filme foi recebida.
                    </p>
                </div>

                <div style="
                    padding: 10px;
                    box-sizing: border-box;
                ">
                    <p style="color: white;">
                        <strong>Email do solicitante:</strong> ${userEmail}
                    </p>

                    <p style="color: white;">
                        <strong>Filme solicitado:</strong> ${movieName}
                    </p>

                    <p style="color: white;">
                        <strong>Ano de lançamento:</strong> ${releaseYear}
                    </p>

                    <p style="color: white;">
                        <strong>Informações extras:</strong> ${description}
                    </p>
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
                background-color: #383D40;
                border-radius: 8px;
            ">
                <div style="
                    padding: 10px;
                    box-sizing: border-box;
                ">
                    <h1 style="font-size: 24px; text-align: center; color: white;"  align="center">
                        Solicitação atendida
                    </h1>
                    <p style="text-align: center; color: white;"  align="center">
                        O filme ${movieName} que você solicitou foi adicionado ao catálogo
                    </p>

                    <div align="center" style="padding-top: 10px;">
                        <a href="#" style="
                            display: inline-block;
                            padding: 10px;
                            font-size: 16px;
                            background-color: #8A2BE2;
                            border-radius: 5px;
                            color: white;
                            text-decoration: none;
                            border: none;
                            outline: none;
                        ">
                            Faça sua review
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `
    });
}