import { SearchCardInputProps } from "@/interfaces/ui/InputProps";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchInput({ placeholder, onChange }: SearchCardInputProps) { 
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Espaço reservado do mesmo tamanho do ícone, evitando "pulo" de layout
        // enquanto o tema real ainda não foi resolvido no client.
        return <div className=" w-9/10 h-5" />;
    }
    
    return (
        <div className="flex search-bar w-[95%] md:w-full rounded-xl px-4 my-5 box-border">
            <button className="" disabled>
                <IoSearchOutline className="" />
            </button>
            <input className="w-full p-2 outline-none" placeholder={placeholder} onChange={onChange}/>
        </div>
    );
}