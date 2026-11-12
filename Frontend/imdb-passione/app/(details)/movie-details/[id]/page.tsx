"use client"
import MovieDetailsPage from "@/components/(details)/movieDetailsPage"
import MovieDetailsPageService from "@/services/(details)/movieDetailsPageService"

export default function MovieDetails() {
    const { movie, reviews, onClose, onConfirm, isOpen, setOpen } = MovieDetailsPageService()
    return(
        <MovieDetailsPage 
            movie={movie!} 
            reviews={reviews!} 
            isOpen={isOpen} 
            onClose={onClose} 
            onConfirm={onConfirm} 
            setOpen={setOpen}
        />
    )
}