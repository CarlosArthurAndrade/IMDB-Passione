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
        <div className="search-bar flex w-full max-w-2xl items-center gap-2 rounded-xl px-4 my-5 box-border">
            <IoSearchOutline className="shrink-0 text-lg opacity-60" aria-hidden />
            <input
                type="search"
                className="w-full bg-transparent p-2 outline-none"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}