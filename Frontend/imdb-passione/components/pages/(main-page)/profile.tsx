'use client'

import ReviewCard from "@/components/ui/reviewCard"
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
                <h1 className="text-xl">{`${user.username ? user.username : '' }`}</h1>
                <p>{`${user.description ? user.description : '' }`}</p>
            </div>
            <div className="w-full flex flex-col items-center box-border p-4">
                {
                   reviews.length === 0 ? (
                    <div>
                        <p>Nenhuma review realizada</p>
                    </div>) :
                    reviews.map((review, index) => 
                    <ReviewCard 
                        title={review.title}
                    />)
                }
            </div>
        </div>
    )
}