"use client"
import { HttpResponse } from "@/interfaces/utils/httpResponse";
import { postData } from "@/services/utils/httpRequests/httpRequests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import sendAlertMessage from "../utils/sendAlertMessage";

const sendResetEmailSchema = z.object({
    email: z.email("Invalid email address")
});

type SendResetEmailInput = z.infer<typeof sendResetEmailSchema>;

export function SendResetEmailPageService() {
    const [alert, setAlert] = useState<{ color: string, message: string }>({
                message: '', color: ''
            })
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SendResetEmailInput>({
        resolver: zodResolver(sendResetEmailSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: SendResetEmailInput) => {
        const response = await postData<null>('https://imdb-passione-backend.vercel.app/auth/send-reset-email', data)
        if(response?.statusCode === 200) {
            setAlert({ message: response.message!, color: 'green' })
            await sendAlertMessage({ message: alert.message, color: alert.color, setShowAlert })
        }
    };

    return { register, handleSubmit, onSubmit, alert, showAlert }
}