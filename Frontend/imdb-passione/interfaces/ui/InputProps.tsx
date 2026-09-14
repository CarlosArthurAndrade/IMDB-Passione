import { ChangeEvent } from "react"
import { Movie } from "../(main-page)/movieCardProps"

export interface SearchCardInputProps {
    placeholder: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface MovieListPageProps {
    movies: Movie[], 
    searchCard: (event: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string 
}