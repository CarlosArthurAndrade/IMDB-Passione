'use client'
import Overview from "@/components/ui/overview";
import ProfileReviewCard from "@/components/ui/reviewCard";
import DarkBackground from "@/components/utils/darkBackground";
import { SunsetBackground } from "@/components/utils/lightBackground";
import ThemeToggle from "@/components/utils/themeToggle";
import { Review, Serie } from "@/interfaces/(main-page)/mainPageInterfaces";
import Image from "next/image";
import Link from "next/link";

export default function SerieDetailsPage({ serie, reviews }: { serie: Serie, reviews: Review[] }) {
    return(
        serie && (
        <div className="relative isolate min-h-screen box-border">
            <DarkBackground />
            <SunsetBackground />
            {/* Div das telas mobile */}
            <div className="w-full relative lg:hidden">
                <div className="relative w-full aspect-video md:aspect-[21/9] max-h-[500px] overflow-hidden">
                    {serie && (
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
                    <h1 className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 text-xl md:text-2xl font-bold text-white drop-shadow-lg bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        {serie?.name}
                    </h1>
                    <Link
                        href="/main"
                        className="absolute left-3 top-3 rounded-full bg-black/50 px-3 md:px-4 md:py-2 md;text-md py-1 text-sm text-white backdrop-blur"
                    >
                        ← Voltar
                    </Link>
                    <div className="absolute right-3 top-3 z-10 bg-black/40 rounded-full p-2 md:p-2.5 text-white">
                        <ThemeToggle />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 px-4 pt-3 text-sm text-zinc-300">
                    <span className="flex items-center md:text-lg gap-1 font-semibold text-black dark:text-white">
                        <span className="text-yellow-400 md:text-lg">★</span>
                        {serie.rating.toFixed(1)}
                    </span>
                    <span className="text-black dark:text-white md:text-lg">{serie?.releaseDate.slice(0, 4)}</span>
                    <span className="text-black dark:text-white md:text-lg">•</span>
                    <span className="text-black dark:text-white md:text-lg">{`${serie.numberOfSeasons} temporadas`}</span>
                </div>
                <Overview text={serie.overview}/>
                <div className="w-full box-border px-4 py-6">
                    {
                        reviews && (
                            reviews.map((review, index) => 
                            <ProfileReviewCard 
                            key={index}
                            showName={review.showName} 
                            username={review.username}
                            profile={false} 
                            text={review.text} 
                            rating={review.rating} 
                            likes={review.likes} 
                            createdAt={review.createdAt} 
                        />)
                        )
                    }
                </div>
            </div>
            {/* Div das telas desktop */}
            <div className="hidden lg:block relative min-h-screen w-full">
                <div className="relative hidden h-[50vh] w-full lg:block">
                    {serie && serie?.posterHorizontal && (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${serie.posterHorizontal}`}
                        alt={`Banner de ${serie.name ?? "série"}`}
                        fill
                        priority
                        sizes="(min-width: 1280px) 1280px, 100vw"
                        className="pointer-events-none select-none object-cover object-[50%_25%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
                        draggable={false}
                    />
                    )}
                    <Link
                        href="/main"
                        className="absolute left-3 top-3 rounded-full bg-black/50 px-3 md:px-4 md:py-2 md;text-md py-1 text-sm text-white backdrop-blur"
                    >
                        ← Voltar
                    </Link>
                    <div className="absolute right-3 top-3 z-10 bg-black/40 rounded-full p-2 md:p-2.5 text-white">
                        <ThemeToggle />
                    </div>
                </div>
                <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 lg:-mt-32 lg:flex-row lg:items-start lg:gap-8">
                    <div className="relative aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 lg:w-64">
                        {serie?.posterVertical && (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${serie.posterVertical}`}
                            alt={`Pôster de ${serie.name ?? "série"}`}
                            fill
                            sizes="(min-width: 1024px) 256px, 192px"
                            className="object-cover"
                        />
                        )}
                    </div>
                    <div className="flex flex-col w-full gap-1 lg:pt-36">
                        <h1 className="text-3xl font-bold">{serie?.name}</h1>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
                            <span className="flex items-center md:text-lg gap-1 font-semibold text-black dark:text-white">
                                <span className="text-yellow-400 md:text-lg">★</span>
                                {serie.rating.toFixed(1)}
                            </span>
                            <span className="text-black dark:text-white md:text-lg">{serie?.releaseDate.slice(0, 4)}</span>
                            <span className="text-black dark:text-white md:text-lg">•</span>
                            <span className="text-black dark:text-white md:text-lg">2 temporadas</span>
                        </div>
                        <p className="text-sm md:text-md leading-6 text-black dark:text-white/75 text-pretty">{serie.overview}</p>
                    </div>
                </div>
                <div className="w-full flex box-border p-4 mt-10 max-w-9/10 justify-self-center">
                        {
                        reviews && (
                            reviews.map((review, index) => 
                                <ProfileReviewCard 
                                key={index}
                                showName={review.showName} 
                                username={review.username}
                                profile={false} 
                                text={review.text} 
                                rating={review.rating} 
                                likes={review.likes} 
                                createdAt={review.createdAt} 
                            />)
                            )
                        }
                </div>
            </div>
        </div>
        )
    )
}