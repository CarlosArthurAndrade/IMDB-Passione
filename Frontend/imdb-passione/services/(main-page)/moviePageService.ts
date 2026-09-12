import { useEffect, useState } from "react";
import { getData } from "../utils/httpRequests/httpRequests";
import { Movie } from "@/interfaces/(main-page)/movieCardProps";

export default function MoviePageService() {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const token = localStorage.getItem('userId')
        const getMovies = async () => {
            const response = await getData<Movie[]>('https://imdb-passione-backend.vercel.app/movies/list', token!)
            setMovies(response?.data ? response.data : [])
        }

        getMovies()
    }, [])

    return({ movies })
}