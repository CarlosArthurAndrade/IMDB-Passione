import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputFieldProps<TFormValues extends FieldValues> = {
    placeholder?: string;
    label: string;
    name: Path<TFormValues>; // Garante que 'name' seja uma chave válida do seu schema
    register: UseFormRegister<TFormValues>;
    error?: FieldError;
    type?: string;
    link?: string;
    linkText?: string,
};

export default function InputLabel<TFormValues extends FieldValues>({
    placeholder,
    label,
    name,
    register,
    error,
    type,
    link,
    linkText
}: InputFieldProps<TFormValues>) {
    return(
        <div className="w-full py-3 rounded-lg">
            { link ? 
            <div className="w-full flex justify-between">
                <p className="">{label}</p>
                <a className="text-xs login-link" href={link}>{linkText}</a>
            </div> : 
            <p className="">{label}</p>
            }
            <input
            {...register(name)}
            type={type} placeholder={placeholder}
            className="w-full p-2 text-sm bg-input input-border focus:outline-none rounded-lg"
        />
        </div>
    )
}