import DarkBackground from "@/components/utils/darkBackground";
import ThemeToggle from "@/components/utils/themeToggle";

export default function Home() {
  return (
    <div className="w-full relative min-h-screen overflow-hidde flex items-center justify-center bg-main">
      <DarkBackground />
      <div className="w-4/5 p-5 lg:w-1/3 flex flex-col items-center bg-card box-border lg:p-10 rounded-lg z-10">
        <div className="w-full flex justify-end">
          <ThemeToggle />
        </div>
        <h1 className="text-xl mb-5 mt-5">Faça seu login!</h1>
        <div className="w-full flex flex-col space-y-2">
          <div className="w-full py-3 rounded-lg">
            <p className="">Email:</p>
            <input 
              type="text" placeholder="exemplo@email.com"
              className="w-full p-2 text-sm bg-input input-border focus:outline-none rounded-lg"
              />
          </div>
          <div className="w-full py-3 rounded-lg">
            <div className="w-full flex justify-between">
              <p className="">Senha:</p>
              <a className="text-xs login-link">Esqueci minha senha</a>
            </div>
            <input 
              type="text"
              className="w-full p-2 text-sm bg-input input-border focus:outline-none rounded-lg"
              />
          </div>
          <div className="w-full flex flex-col items-center space-y-4">
            <button
              className=" w-full p-2 bg-login-button rounded-lg mt-5 text-white"
            >
              Entrar
            </button>
            <div className="w-full flex justify-center space-x-0.5">
              <p className="text-xs">Não possui uma conta?</p>
              <a
                href="#"
                className="text-xs login-link"
              >
                Cadastre-se
              </a>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}