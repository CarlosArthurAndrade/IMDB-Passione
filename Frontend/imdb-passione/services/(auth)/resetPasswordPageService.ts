"use client"
import { HttpResponse } from "@/interfaces/utils/httpResponse";
import { postData } from "@/services/utils/httpRequests/httpRequests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import sendAlertMessage from "../utils/sendAlertMessage";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z.object({
  password: z.string(),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
    error: 'Campos não são iguais',
    path: ['confirm_password']
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPageService() {
    const [alert, setAlert] = useState<{ color: string, message: string }>({
            message: '', color: ''
        })
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { confirm_password: "", password: "" },
    });

    const router = useRouter();

    const onSubmit = async (data: ResetPasswordInput, token: string) => {
        const reqBody = { password: data.password, token}
        const response = await postData<null>('https://imdb-passione-backend.vercel.app/auth/reset-password', reqBody)
        if(response?.statusCode === 200){
            setAlert({ message: response.message!, color: 'green' })
            await sendAlertMessage({ message: alert.message, color: alert.color, setShowAlert })
            router.push('/')
        }
    };

    return { register, handleSubmit, onSubmit, alert, showAlert }
}