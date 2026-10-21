'use client'
import Overview from "@/components/ui/overview";
import DarkBackground from "@/components/utils/darkBackground";
import { SunsetBackground } from "@/components/utils/lightBackground";
import ThemeToggle from "@/components/utils/themeToggle";
import { Review, Serie } from "@/interfaces/(main-page)/mainPageInterfaces";
import { postData } from "@/services/utils/httpRequests/httpRequests";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SerieDetails() {
    const [serie, setSerie] = useState<Serie>()
    const [reviews, setReviews] = useState<Review[]>()
    const id = useParams<{ id: string }>().id

    useEffect(() => {
        const token = window.localStorage.getItem("userId")
        const getSerie = async () => {
        const serieDetaisResponse = await postData<Serie>('https://imdb-passione-backend.vercel.app/series/serie-by-id', { id }, token!)
        const serieReviewsResponse = await postData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/serie-reviews', { serieId: id }, token!)
        setSerie(serieDetaisResponse?.data)
        setReviews(serieReviewsResponse?.data)
        }
        getSerie()
    }, [])

    console.log(reviews)

    return(
        serie && (
        <div className="box-border">
            <DarkBackground />
            <SunsetBackground />
            <div className="relative w-full aspect-video md:aspect-[21/9] max-h-[500px] overflow-hidden bg-card">
                {id && (
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280/${serie?.posterHorizontal}`}
                        alt={`Banner de ${'Frieren'}`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover pointer-events-none select-none"
                        draggable={false}
                    />
                )}
                <h1 className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 text-xl font-bold text-white drop-shadow-lg bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg">
                    {serie?.name}
                </h1>
                <Link
                    href="/main"
                    className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur"
                >
                    ← Voltar
                </Link>
                <div className="absolute right-3 top-3 z-10 bg-black/40 rounded-full p-2 text-white">
                    <ThemeToggle />
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-4 pt-3 text-sm text-zinc-300">
                <span className="flex items-center gap-1 font-semibold text-black dark:text-white">
                    <span className="text-yellow-400">★</span>
                    {serie.rating.toFixed(1)}
                </span>
                <span className="text-black dark:text-white">{serie?.releaseDate.slice(0, 4)}</span>
                <span className="text-black dark:text-white">•</span>
                <span className="text-black dark:text-white">2 temporadas</span>
            </div>
            <Overview text={serie.overview}/>
        </div>
        )
    )
}

// qykTIEJQF8cunKD0CKOqab15wns.jpg -> vertical
// rBOnrVlck7BIlGeWVlzYiZeg4l2.jpg -> horizontal

{/* <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-card">
                <Image
                    src={`https://image.tmdb.org/t/p/w780/${id}`}
                    alt="Pôster da série"
                    fill
                    loading="eager"
                    sizes="25vw"
                    className="object-cover pointer-events-none select-none"
                    draggable={false}
                />
            </div> */}