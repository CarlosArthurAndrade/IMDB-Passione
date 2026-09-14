import { useEffect, useMemo, useState } from "react";
import { getData } from "../utils/httpRequests/httpRequests";
import { Movie } from "@/interfaces/(main-page)/movieCardProps";

export default function MoviePageService() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [search, setSearch] = useState("")

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const matchesSearch =
                movie.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

            return matchesSearch
        })
    }, [movies, search])


    const searchCard = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        const token = localStorage.getItem('userId')
        const getMovies = async () => {
            const response = await getData<Movie[]>('https://imdb-passione-backend.vercel.app/movies/list', token!)
            setMovies(response?.data ? response.data : [])
        }

        getMovies()
    }, [])

    return({ filteredMovies, searchCard })
}