"use client"
import { postData } from "@/utils/httpRequests/httpRequests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string(),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
    error: 'Campos não são iguais',
    path: ['confirm_password']
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPageService() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { confirm_password: "", password: "" },
    });

    const onSubmit = async (data: ResetPasswordInput, token: string) => {
        const reqBody = { password: data.password, token}
        console.log('teste')
        const response = await postData('https://imdb-passione-backend.vercel.app/auth/reset-password', reqBody)
        console.log(response)
    };

    return { register, handleSubmit, onSubmit }
}