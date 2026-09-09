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

    const onSubmit = (data: SendResetEmailInput) => {
        console.log(data);
    };

    return { register, handleSubmit, onSubmit }
}