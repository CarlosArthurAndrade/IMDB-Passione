"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from 'next/navigation'
import { z } from "zod";
import { postData } from "../utils/httpRequests/httpRequests";
import { HttpResponse } from "@/interfaces/utils/httpResponse";
import { useState } from "react";
import sendAlertMessage from "../utils/sendAlertMessage";

const registerSchema = z.object({
    username: z.string(),
    email: z.email("Invalid email address"),
    password: z.string(),
});

type RegisterInput = z.infer<typeof registerSchema>;

export function RegisterPageService() {
    const [alert, setAlert] = useState<{ color: string, message: string }>({
        message: '', color: ''
    })
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: "", email: "", password: "" },
    });

    const router = useRouter();

    const onSubmit = async (data: RegisterInput) => {
        const response = await postData<HttpResponse<null>>('https://imdb-passione-backend.vercel.app/auth/register', data)
        if(response?.statusCode === 201){
            setAlert({ message: 'Cadastro feito com sucesso', color: 'green' })
            await sendAlertMessage({ message: alert.message, color: alert.color, setShowAlert })
            router.push('/')
        } else if(response?.statusCode === 409) {
            setAlert({ message: 'Email ou usuário já cadastrado', color: 'red' })
            await sendAlertMessage({ message: alert.message, color: alert.color, setShowAlert })
        } else {
            setAlert({ message: 'Ocorreu um erro no sistema', color: 'red' })
            await sendAlertMessage({ message: alert.message, color: alert.color, setShowAlert })
        }
    };

    return { register, handleSubmit, onSubmit, alert, showAlert }
}