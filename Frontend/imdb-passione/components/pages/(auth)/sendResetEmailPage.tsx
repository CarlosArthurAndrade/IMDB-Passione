'use client'
import InputLabel from "@/components/ui/inputLabel";
import ResponseAlert from "@/components/ui/responseAlert";
import SubmitButtonComponent from "@/components/ui/submitButtonComponent";
import DarkBackground from "@/components/utils/darkBackground";
import ThemeToggle from "@/components/utils/themeToggle";
import { SendResetEmailPageService } from "@/services/(auth)/sendResetEmailPageService";

export default function SendResetEmailPage() {
    const { register, onSubmit, handleSubmit, alert, showAlert } = SendResetEmailPageService() 
    return(
        <div className="w-full relative min-h-screen overflow-hidden flex items-center justify-center bg-main">
            <DarkBackground />
            { showAlert && <ResponseAlert message={alert.message} color={alert.color} /> }
            <div className="w-4/5 p-5 md:w-1/2 lg:w-1/3 flex flex-col items-center bg-card box-border lg:p-10 rounded-lg z-10">
                <div className="w-full flex justify-end">
                    <ThemeToggle />
                </div>
                <h1 className="text-xl mb-5 mt-5">Digite seu email</h1>
                <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel register={register} label="Email:" name="email" />
                    <div className="w-full flex flex-col items-center space-y-4">
                        <SubmitButtonComponent text="Enviar"/>
                        <div className="w-full flex justify-center space-x-0.5">
                            <a href="/" className="text-xs login-link">
                                Voltar ao login!
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}