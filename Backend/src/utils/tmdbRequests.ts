import * as dotenv from 'dotenv'
import type { TMDBSearchMovieDetailsResult, TMDBSearchResult } from "../Interfaces/utils.js";

dotenv.config({ quiet: true })

export const getMoviesList = async (title: string) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=pt-BR&page=1`, 
            { headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` }
        }).then(resp => resp.json()) as TMDBSearchResult
        return response.results
    } catch(err) {
        console.error(err)
    }
}

export const getMovieDataById = async (id: number) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, 
            { headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` }
        }).then(resp => resp.json()) as TMDBSearchMovieDetailsResult

        return response
    } catch (err) {
        console.error(err)
    }
}