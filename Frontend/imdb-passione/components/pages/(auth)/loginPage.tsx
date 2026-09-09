'use client'
import InputLabel from "@/components/ui/inputLabel";
import DarkBackground from "../../utils/darkBackground";
import ThemeToggle from "../../utils/themeToggle";
import { LoginPageService } from "@/services/(auth)/loginPageService";
import SubmitButtonComponent from "@/components/ui/submitButtonComponent";

export function LoginPage() {
    const { onSubmit, handleSubmit, register } = LoginPageService()

    return(
        <div className="w-full relative min-h-screen overflow-hidden flex items-center justify-center bg-main">
            <DarkBackground />
            <div className="w-4/5 p-5 lg:w-1/3 flex flex-col items-center bg-card box-border lg:p-10 rounded-lg z-10">
                <div className="w-full flex justify-end">
                    <ThemeToggle />
                </div>
                <h1 className="text-xl mb-5 mt-5">Faça seu login!</h1>
                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel 
                        register={register} 
                        type="text" 
                        name="email" 
                        placeholder="exemplo@gmail.com" 
                        label="Email:"
                    />
                    <InputLabel 
                        register={register} 
                        type="password" 
                        label="Senha:" 
                        name="password" 
                        link="/send-reset-email" 
                        linkText="Esqueci minha senha"
                    />
                    <div className="w-full flex flex-col items-center space-y-4">
                        <SubmitButtonComponent text="Entrar"/>
                        <div className="w-full flex justify-center space-x-0.5">
                            <p className="text-xs">Não possui uma conta?</p>
                            <a href="/register" className="text-xs login-link">
                                Cadastre-se
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}