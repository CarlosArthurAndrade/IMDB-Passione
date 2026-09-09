import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string(),
  confirm_password: z.string()
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

    const onSubmit = (data: ResetPasswordInput) => {
        console.log(data);
    };

    return { register, handleSubmit, onSubmit }
}