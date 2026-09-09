"use client";
import { postData } from "@/utils/httpRequests/httpRequests";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from 'next/navigation'
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function LoginPageService() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: LoginInput) => {
        const response = await postData<{token: string}>('https://imdb-passione-backend.vercel.app/auth/login', data)
        localStorage.setItem("userId", JSON.stringify(response?.token))
        redirect('/main')
    };

    return { register, handleSubmit, onSubmit }
}