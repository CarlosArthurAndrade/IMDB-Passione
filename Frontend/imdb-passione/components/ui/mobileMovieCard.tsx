import { MobileMovieCardProps } from "@/interfaces/(main-page)/movieCardProps"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

const cardVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function MobileMovieCard({ _id, posterHorizontal, rating, year, title }: MobileMovieCardProps) {
    const router = useRouter()
    console.log(`https://image.tmdb.org/t/p/original${posterHorizontal}`)
    return(
        <AnimatePresence>
            <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full flex flex-col items-center" onClick={() => router.push(`/movie-details/${_id}`)}>
                    <div className="w-full mt-10 px-4">
                        <div className="w-full flex flex-col items-center">
                            <div 
                            className={`relative w-full h-[200px] rounded-lg overflow-hidden bg-cover bg-center`}
                            style={{
                                backgroundImage: `url("https://image.tmdb.org/t/p/original${posterHorizontal}")`
                            }}
                            >
                                
                                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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
                    </div>
            </motion.div>
        </AnimatePresence>
    )
}