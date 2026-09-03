import * as dotenv from 'dotenv'
import { TMDBSearchMovieDetailsResult, TMDBSearchResult } from "../Interfaces/utils";

dotenv.config({ quiet: true })

export const getMovieId = async (title: string, year: number) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=pt-BR&page=1&year=${year}`, 
        { headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` }
    }).then(resp => resp.json()) as TMDBSearchResult

    return response.results[0].id
}

export const getMovieDataById = async (id: number) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, 
        { headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` }
    }).then(resp => resp.json()) as TMDBSearchMovieDetailsResult

    return response
}