"use client"
import { postData } from "@/services/utils/httpRequests/httpRequests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const sendResetEmailSchema = z.object({
    email: z.email("Invalid email address")
});

type SendResetEmailInput = z.infer<typeof sendResetEmailSchema>;

export function SendResetEmailPageService() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SendResetEmailInput>({
        resolver: zodResolver(sendResetEmailSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: SendResetEmailInput) => {
        const response = await postData('https://imdb-passione-backend.vercel.app/auth/send-reset-email', data)
        console.log(response)
    };

    return { register, handleSubmit, onSubmit }
}