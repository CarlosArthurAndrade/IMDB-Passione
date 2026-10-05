'use client'

import MovieCard from "@/components/ui/movieCard"
import SearchInput from "@/components/ui/searchInput"
import ThemeToggle from "@/components/utils/themeToggle"
import { MovieListPageProps } from "@/interfaces/ui/InputProps"

export default function MoviesList({ movies, searchCard }: MovieListPageProps) {
    return (
        <div className="mx-auto mt-15 flex min-h-full w-full max-w-6xl flex-col items-center justify-start px-4 pb-4">
            {/* Cabeçalho: espaçador | título centralizado | toggle de tema */}
            <div className="flex w-full items-center pt-3 md:pt-4 lg:mb-5">
                <div className="w-9 md:w-10 lg:w-11" />
                <h1 className="flex-1 text-center text-lg font-medium md:text-xl lg:text-2xl">
                    Catálogo de filmes
                </h1>
                <div className="flex w-9 justify-end md:w-10 lg:w-11">
                    <ThemeToggle />
                </div>
            </div>

            <SearchInput placeholder="Digite o nome do filme" onChange={searchCard} />

            {/* Grade: 1 coluna no mobile, 2 a partir do md */}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                {
                movies.length === 0 ? (<p className="mt-10 text-sm text-white/60"> Nenhum resultado encontrado.</p>) :
                movies.map((movie, index) => 
                    <MovieCard
                        key={movie._id}
                        _id={movie._id}
                        title={movie.title}
                        posterHorizontal={movie.posterHorizontal}
                        posterVertical={movie.posterVertical}
                        rating={movie.rating}
                        year={movie.releaseDate}
                        overview={movie.overview}
                        isFirst={index < 2}
                    />
                )}
            </div>
        </div>
    )
}