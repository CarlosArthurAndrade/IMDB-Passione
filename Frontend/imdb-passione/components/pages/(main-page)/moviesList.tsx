'use client'
import MovieCard from "@/components/ui/movieCard"
import SearchInput from "@/components/ui/searchInput"
import ThemeToggle from "@/components/utils/themeToggle"
import { MovieListPageProps } from "@/interfaces/ui/InputProps"

export default function MoviesList({ movies, placeholder, searchCard }: MovieListPageProps) {
    return(
        <div className="min-h-full w-full flex flex-col items-center md:px-4 justify-start mt-15 pb-4">
            <div className="flex items-center w-full px-4 md:px-6 lg:px-10 pt-3 md:pt-4">
                <div className="w-9 md:w-10 lg:w-11" />
                <h1 className="flex-1 text-center text-lg md:text-xl lg:text-2xl font-medium lg:mb-5">
                    Catálogo de filmes
                </h1>
                <div className="w-9 md:w-10 lg:w-11 flex justify-end">
                    <ThemeToggle />
                </div>
            </div>
            <SearchInput placeholder={placeholder} onChange={searchCard}/>
            <div className="grid grid-cols-1 lg:items-stretch gap-8 md:gap-2 px-4 md:px-0 md:grid md:grid-cols-2 w-full">
                {movies.map((movie, index) => 
                    <MovieCard 
                        key={movie._id}
                        title={movie.title} 
                        posterHorizontal={movie.posterHorizontal}
                        posterVertical={movie.posterVertical} 
                        rating={movie.rating} 
                        year={movie.releaseDate} 
                        _id={movie._id}
                        isFirst={ index < 2 }
                        overview={movie.overview}
                    />
                )}
            </div>
        </div>
    )
}