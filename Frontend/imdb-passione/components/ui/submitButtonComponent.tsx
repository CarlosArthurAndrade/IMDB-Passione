export default function SubmitButtonComponent({ text }: { text: string }) {
    return(
        <button
            type="submit"
            className=" w-full p-2 bg-login-button rounded-lg mt-5 text-white"
        >
           {text}
        </button>
    )
}