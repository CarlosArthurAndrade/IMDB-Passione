'use client'

import ProfileReviewCard from "@/components/ui/profileReviewCard"
import ThemeToggle from "@/components/utils/themeToggle"
import { ProfilePageProps } from "@/interfaces/ui/InputProps"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Profile({ user, reviews, logout }: ProfilePageProps) {
    return(
        <div className="min-h-full py-12">
            <div className="mx-auto flex h-16 w-full sm:max-w-3xl lg:max-w-[95%] items-center justify-between px-4 sm:px-6">
                <button
                    type="button"
                    onClick={logout}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-[#c4607f] to-[#e08ba6] px-4 text-sm font-medium text-white shadow-md shadow-pink-900/20 transition hover:brightness-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 dark:from-violet-600 dark:to-purple-400 dark:shadow-purple-500/25 dark:focus-visible:ring-purple-300"
                >
                    Sair
                </button>

                <ThemeToggle />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto flex w-full max-w-md flex-col items-center px-6 pb-8 pt-6 text-center sm:pt-10"
            >
                <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-[0_8px_30px_rgba(196,96,127,0.35)] dark:shadow-[0_8px_30px_rgba(139,92,246,0.45)] md:h-48 md:w-48 lg:h-64 lg:w-64">
                    <Image
                        src="/images/maomao-avatar-512.webp"
                        alt={`Avatar de ${user.username}`}
                        fill
                        sizes="(min-width: 1024px) 256px, (min-width: 768px) 192px, 128px"
                        className="object-cover"
                    />
                </div>

                <h1 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-white sm:text-2xl">
                {user.username}
                </h1>

                {user.description && (
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-800 dark:text-white/70 sm:max-w-sm sm:text-base">
                    {user.description}
                </p>
                )}
            </motion.div>
            <div className="w-full flex flex-col items-center box-border p-4 mt-2">
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
                        rating={review.rating}
                        likes={0} 
                        username={review.username}
                        createdAt={review.createdAt}
                    />)
                }
            </div>
        </div>
    )
}