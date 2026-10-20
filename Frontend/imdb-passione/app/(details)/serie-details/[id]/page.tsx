'use client'
import DarkBackground from "@/components/utils/darkBackground";
import { SunsetBackground } from "@/components/utils/lightBackground";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SerieDetails() {
    const id = useParams<{ id: string }>().id

    console.log(id)

    return(
        <div className="box-border">
            <DarkBackground />
            <SunsetBackground />
            <div className="relative w-full aspect-video md:aspect-[21/9] max-h-[500px] overflow-hidden rounded-lg bg-card">
                {id && (
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280/${id}`}
                        alt={`Banner de ${'Frieren'}`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover pointer-events-none select-none"
                        draggable={false}
                    />
                )}
                <Link
                    href="/"
                    className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur"
                >
                    ← Voltar
                </Link>
            </div>
        </div>
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