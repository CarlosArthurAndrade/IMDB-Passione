import type { Request } from "express";
import { ObjectId } from "mongodb";

export interface TagItem {
    name: string
}

interface MovieGenre {
    name: string
}

export interface TMDBSearchResult {
    results: { id: number }[]
}

export interface TMDBSearchMovieDetailsResult {
    genres: MovieGenre[],
    overview: string,
    poster_path: string,
    release_date: string,
    title: string
}

export default interface UserAuthRequest extends Request {
    user: ObjectId
}