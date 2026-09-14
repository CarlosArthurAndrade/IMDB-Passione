'use client'

import MobileMovieCard from "@/components/ui/mobileMovieCard"
import SearchInput from "@/components/ui/searchInput"
import ThemeToggle from "@/components/utils/themeToggle"
import { MovieListPageProps } from "@/interfaces/ui/InputProps"

export default function MoviesList({ movies, placeholder, searchCard }: MovieListPageProps) {
    return(
        <div className="w-full flex flex-col items-center justify-center mt-15">
            <div className="absolute top-10 right-7">
                <ThemeToggle />
            </div>
            <h1 className="text-xl text-white/80">Catálogo de filmes</h1>
            <SearchInput placeholder={placeholder} onChange={searchCard}/>
            <div className="flex flex-col gap-8 px-4 lg:grid md:grid-cols-2 md:gap-1 md:w-3/4 w-full overflow-y-auto"> 
                {movies.map((movie, index) => 
                    <MobileMovieCard 
                        key={movie._id}
                        title={movie.title} 
                        posterHorizontal={movie.posterHorizontal} 
                        rating={movie.rating} 
                        year={movie.releaseDate} 
                        _id={movie._id}
                        isFirst={ index < 2 }
                    />
                )}
            </div>
        </div>
    )
}