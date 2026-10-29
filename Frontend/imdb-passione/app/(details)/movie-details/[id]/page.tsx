'use client'

import MovieDetailsPage from "@/components/(details)/movieDetailsPage"
import MovieDetailsPageService from "@/services/(details)/movieDetailsPageService"

export default function MovieDetails() {
    const { movie, reviews } = MovieDetailsPageService()
    return(
        <MovieDetailsPage movie={movie!} reviews={reviews!}/>
    )
}