import { MovieCardProps, SerieCardProps } from "@/interfaces/(main-page)/mainPageInterfaces"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function SerieCard({ _id, posterHorizontal, posterVertical, rating, year, name, isFirst, overview }: SerieCardProps) {
    const router = useRouter()
    return(
        <AnimatePresence>
            <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full flex flex-col items-center"
            >
                <div className="w-full">
                {/* Cards da listagem mobile e telas md */}
                    <Link 
                        href={`/serie-details/${_id}`}
                        className="group flex overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-white/60"
                    >
                        <div className="w-full flex lg:hidden flex-col items-center">
                            <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                                
                                <Image
                                    src={`https://image.tmdb.org/t/p/w780${posterHorizontal}`}
                                    alt={name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    className="object-cover pointer-events-none select-none"
                                    draggable={false}
                                    priority={isFirst}
                                    style={{
                                        WebkitUserDrag: 'none',
                                        WebkitTouchCallout: 'none',
                                    } as React.CSSProperties}
                                />

                                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

                                <div className="relative z-10 flex flex-col items-start justify-end w-full h-full p-4">
                                    <h3 className="text-2xl font-bold leading-tight text-white text-balance line-clamp-2 drop-shadow-md">{name}</h3>
                                    <div className="mt-1.5 flex items-center gap-2.5 text-xs tabular-nums tracking-wide drop-shadow md:text-sm">
                                        {rating > 0 && (
                                        <>
                                            <span className="flex items-center gap-1 font-semibold text-white">
                                            <span className="text-yellow-400">★</span>
                                            {rating.toFixed(1)}
                                            </span>
                                            <span className="h-3 w-px bg-white/30" />
                                        </>
                                        )}
                                        <span className="font-medium text-white/60">{new Date(year).getFullYear()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </Link>
                {/* Cards da listagem lg e desktop */}
                    <Link 
                        href={`/serie-details/${_id}`}
                        className="group flex overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-white/60"
                    >
                        <div className="lg:flex hidden bg-card rounded-lg h-[280px] overflow-hidden">
                            <div className="relative aspect-[2/3] h-full flex-shrink-0">
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${posterVertical}`}
                                    alt={name}
                                    fill
                                    className="object-cover rounded-l-lg"
                                    sizes="25vw"
                                    loading="eager"
                                />
                            </div>
                            <div className="flex flex-col justify-between box-border p-2 min-w-0">
                                <div className="md:grid md:grid-cols-1 gap-4">
                                    <p className="text-xl font-bold">{name}</p>
                                    <p className="text-sm font-normal dark:text-white/75 leading-relaxed text-wrap line-clamp-4 max-w-prose">{overview}</p>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2.5 text-xs tabular-nums tracking-wide drop-shadow md:text-sm">
                                    {rating > 0 && (
                                        <>
                                        <span className="flex items-center gap-1 font-semibold text-white">
                                        <span className="text-yellow-400">★</span>
                                        {rating.toFixed(1)}
                                        </span>
                                        <span className="h-3 w-px bg-white/30" />
                                    </>
                                    )}
                                    <span className="font-medium text-white/60">{new Date(year).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}