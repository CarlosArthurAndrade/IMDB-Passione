'use client'

import ThemeToggle from "@/components/utils/themeToggle"
import { ProfilePageProps } from "@/interfaces/ui/InputProps"
import Image from "next/image"

export default function Profile({ user, reviews }: ProfilePageProps) {
    return(
        <div className="min-h-full py-12">
            <div className="w-full flex justify-end pr-10 pb-5">
                <ThemeToggle />
            </div>
            <div className="w-full flex flex-col items-center gap-4">
                <Image 
                    src="/images/maomao-avatar-512.webp" 
                    width={96} 
                    height={96} 
                    alt={""}
                    className="rounded-full"
                />
                <h1 className="text-xl">{user.username}</h1>
            </div>
        </div>
    )
}