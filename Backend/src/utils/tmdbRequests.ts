import * as dotenv from 'dotenv'
import type { TMDBMovieSearchResult, TMDBSearchMovieItem, TMDBSerie1SearchResult } from "../../../Backend/src/Interfaces/utils.js";

dotenv.config({ quiet: true })

export const getMoviesList = async (title: string) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=pt-BR&page=1`, 
            { headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` }
        }).then(resp => resp.json()) as TMDBMovieSearchResult
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
        }).then(resp => resp.json()) as TMDBSearchMovieItem

        return response
    } catch (err) {
        console.error(err)
    }
}

export const getSerieList = async (name: string) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?query=${name}include_adult=false&language=pt-BR&page=1`
        ).then(resp => resp.json()) as TMDBSerie1SearchResult

        return response
    } catch(err){
        console.log(err)
    }
}

export const getSerieDataById = async (id: number) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?language=pt-BR`
        ).then(resp => resp.json()) as TMDBSerie1SearchResult

        return response
    } catch(err){
        console.log(err)
    }
}