"use client";
import { postData } from "@/services/utils/httpRequests/httpRequests";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from 'next/navigation'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import sendAlertMessage from "../utils/sendAlertMessage";
import { HttpResponse } from "@/interfaces/utils/httpResponse";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function LoginPageService() {
    const [alert, setAlert] = useState<{ color: string, message: string }>({
        message: '', color: ''
    })
    const [showAlert, setShowAlert] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const router = useRouter();

    const onSubmit = async (data: LoginInput) => {
        try {
            const response = await postData<string>('https://imdb-passione-backend.vercel.app/auth/login', data)
            if(response?.statusCode === 200){
                localStorage.setItem("userId", response.data!)
                router.push('/main')
            } else if(response?.statusCode === 404) {
                setAlert({ message: response.message!, color: 'red' })
                await sendAlertMessage({ message: alert.message, color: alert.color, setShowAlert })
            } else {
                setAlert({ message: 'Ocorreu um erro no sistema', color: 'red' })
                await sendAlertMessage({ message: alert.message, color: alert.color, setShowAlert })
            }
        } catch(err) {
            console.error(err)
        }
    };

    return { register, handleSubmit, onSubmit, alert, showAlert }
}