import { MovieCardProps } from "@/interfaces/(main-page)/movieCardProps"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

const cardVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function MovieCard({ _id, posterHorizontal, posterVertical, rating, year, title, isFirst, overview }: MovieCardProps) {
    const router = useRouter()
    return(
        <AnimatePresence>
            <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full flex flex-col items-center" onClick={() => router.push(`/movie-details/${_id}`)}>
                    <div className="w-full">
                        {/* Cards da listagem mobile e telas md */}
                        <div className="w-full flex lg:hidden flex-col items-center">
                            <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                                
                                <Image
                                    src={`https://image.tmdb.org/t/p/w780${posterHorizontal}`}
                                    alt={title}
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
                                    <h2 className="text-3xl font-semibold text-white">{title}</h2>
                                    <div className="w-full flex items-center gap-2 text-sm text-gray-200">
                                        <span>⭐ {rating}</span>
                                        <span>•</span>
                                        <span>{new Date(year).getFullYear()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Cards da listagem lg e desktop */}
                        <div className="lg:flex hidden bg-card rounded-lg h-[280px] overflow-hidden">
                            <div className="relative aspect-[2/3] h-full flex-shrink-0">
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${posterVertical}`}
                                    alt={title}
                                    fill
                                    className="object-cover rounded-l-lg"
                                    sizes="25vw"
                                    loading="eager"
                                />
                            </div>
                            <div className="flex flex-col justify-between box-border p-2 min-w-0">
                                <div className="md:grid md:grid-cols-1 gap-4">
                                    <p className="text-xl">{title}</p>
                                    <p className="text-sm text-wrap line-clamp-4">{overview}</p>
                                </div>
                                <div className="w-full flex items-center gap-2 text-sm text-gray-200">
                                    <span className="text-black dark:text-white">⭐ {rating}</span>
                                    <span className="text-black dark:text-white">•</span>
                                    <span className="text-black dark:text-white">{new Date(year).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </motion.div>
        </AnimatePresence>
    )
}