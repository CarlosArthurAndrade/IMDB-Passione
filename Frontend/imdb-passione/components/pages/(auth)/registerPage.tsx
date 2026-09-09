'use client'
import { RegisterPageService } from "@/services/(auth)/registerPageService";
import DarkBackground from "../../utils/darkBackground";
import InputLabel from "@/components/ui/inputLabel";
import SubmitButtonComponent from "@/components/ui/submitButtonComponent";

export default function RegisterPage() {
    const { register, handleSubmit, onSubmit } = RegisterPageService()
    return(
        <div className="w-full relative min-h-screen overflow-hidden flex items-center justify-center bg-main">
            <DarkBackground />
            <div className="w-4/5 p-5 lg:w-1/3 flex flex-col items-center bg-card box-border lg:p-10 rounded-lg z-10">
                <h1 className="text-xl mb-5 mt-5">Crie sua conta!</h1>
                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel register={register} label="Username:" type="text" name="username" />
                    <InputLabel register={register} label="Email:" type="email" name="email" placeholder="exemplo@gmail.com"/>
                    <InputLabel register={register} label="Senha:" type="text" name="password" />
                    <div className="w-full flex flex-col items-center space-y-4">
                        <SubmitButtonComponent text="Registrar"/>
                        <div className="w-full flex justify-center space-x-0.5">
                            <p className="text-xs">Já possui uma conta?</p>
                            <a href="/" className="text-xs login-link">
                                Faça o login
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}