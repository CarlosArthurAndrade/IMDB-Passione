'use client'
import InputLabel from "@/components/ui/inputLabel"
import SubmitButtonComponent from "@/components/ui/submitButtonComponent"
import DarkBackground from "@/components/utils/darkBackground"
import ThemeToggle from "@/components/utils/themeToggle"
import { ResetPasswordPageService } from "@/services/(auth)/resetPasswordPageService"
import { useParams } from "next/navigation"

export default function ResetPasswordPage() {
    const { register, onSubmit, handleSubmit } = ResetPasswordPageService()
    const token = useParams<{ token: string }>().token
    return(
        <div className="w-full relative min-h-screen overflow-hidden flex items-center justify-center bg-main">
            <DarkBackground />
            <div className="w-4/5 p-5 lg:w-1/3 flex flex-col items-center bg-card box-border lg:p-10 rounded-lg z-10">
                <div className="w-full flex justify-end">
                    <ThemeToggle />
                </div>
                <h1 className="text-xl mb-5 mt-5">Defina sua nova senha</h1>
                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit(data => onSubmit(data, token))}>
                    <InputLabel register={register} type="text" name="password" label="Senha:"/>
                    <InputLabel register={register} type="text" name="confirm_password" label="Confirme sua senha:"/>
                    <div className="w-full flex flex-col items-center space-y-4">
                        <SubmitButtonComponent text="Redefinir Senha"/>
                    </div>
                </form>
            </div>
        </div>
    )
}