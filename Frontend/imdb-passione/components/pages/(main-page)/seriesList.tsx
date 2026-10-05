'use client'

import SearchInput from "@/components/ui/searchInput"
import SerieCard from "@/components/ui/serieCard"
import ThemeToggle from "@/components/utils/themeToggle"
import { SerieListPageProps } from "@/interfaces/ui/InputProps"

export default function SeriesList({ series, searchCard }: SerieListPageProps) {
    return(
        <div className="mx-auto mt-15 flex min-h-full w-full max-w-6xl flex-col items-center justify-start px-4 pb-4">
            {/* Cabeçalho: espaçador | título centralizado | toggle de tema */}
            <div className="flex w-full items-center pt-3 md:pt-4 lg:mb-5">
                <div className="w-9 md:w-10 lg:w-11" />
                <h1 className="flex-1 text-center text-lg font-medium md:text-xl lg:text-2xl">
                    Catálogo de séries
                </h1>
                <div className="flex w-9 justify-end md:w-10 lg:w-11">
                    <ThemeToggle />
                </div>
            </div>

            <SearchInput placeholder="Digite o nome da série" onChange={searchCard} />

            {/* Grade: 1 coluna no mobile, 2 a partir do md */}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                {
                series.length === 0 ? (<p className="mt-10 text-sm text-white/60"> Nenhum resultado encontrado.</p>) :
                series.map((serie, index) => 
                    <SerieCard
                        key={serie._id}
                        name={serie.name}
                        posterHorizontal={serie.posterHorizontal}
                        posterVertical={serie.posterVertical}
                        rating={serie.rating}
                        year={serie.releaseDate}
                        _id={serie._id}
                        isFirst={index < 2}
                        overview={serie.overview}
                        inProduction={serie.inProduction}
                        status={serie.status}
                    />
                )}
            </div>
        </div>
    )
}