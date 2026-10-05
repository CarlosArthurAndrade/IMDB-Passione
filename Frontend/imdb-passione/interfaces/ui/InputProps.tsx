import { ChangeEvent } from "react"
import { Movie, Serie } from "../(main-page)/mainPageInterfaces"

export interface SearchCardInputProps {
    placeholder: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface MovieListPageProps {
    movies: Movie[], 
    searchCard: (event: ChangeEvent<HTMLInputElement>) => void,
}

export interface SerieListPageProps {
    series: Serie[], 
    searchCard: (event: ChangeEvent<HTMLInputElement>) => void,
}