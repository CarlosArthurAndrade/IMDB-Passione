'use client'

import ProfileReviewCard from "@/components/ui/profileReviewCard"
import ThemeToggle from "@/components/utils/themeToggle"
import { ProfilePageProps } from "@/interfaces/ui/InputProps"
import Image from "next/image"

export default function Profile({ user, reviews }: ProfilePageProps) {
    console.log(reviews)
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
                <p className="mt-4">{`${user.description ? user.description : '' }`}</p>
            </div>
            <div className="w-full flex flex-col items-center box-border p-4 mt-15">
                {
                   reviews.length === 0 ? (
                    <div>
                        <p>Nenhuma review realizada</p>
                    </div>) :
                    reviews.map((review, index) => 
                    <ProfileReviewCard
                        key={index}
                        title={review.title}
                        movieName={review.movieName}
                        text={review.text}
                        rating={0}
                        likes={0} 
                        username={""}
                    />)
                }
            </div>
        </div>
    )
}