'use client'

import MobileMovieCard from "@/components/ui/mobileMovieCard"
import MoviePageService from "@/services/(main-page)/moviePageService"

export default function MoviesList() {
    const { movies } = MoviePageService()
    return(
        <div className="w-full flex flex-col items-center justify-center mt-15">
            <h1 className="text-xl">Listagem de filmes</h1>
            <div className="flex flex-col w-full"> 
                {movies.map(movie => 
                    <MobileMovieCard 
                        key={movie._id}
                        title={movie.title} 
                        posterHorizontal={movie.posterHorizontal} 
                        rating={movie.rating} 
                        year={movie.releaseDate} 
                        _id={movie._id}
                    />
                )}
            </div>
        </div>
    )
}