"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from 'next/navigation'
import { z } from "zod";

const registerSchema = z.object({
    username: z.string(),
    email: z.email("Invalid email address"),
    password: z.string(),
});

type RegisterInput = z.infer<typeof registerSchema>;

export function RegisterPageService() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: "", email: "", password: "" },
    });

    const onSubmit = (data: RegisterInput) => {
        console.log(data);
    };

    return { register, handleSubmit, onSubmit }
}