import type { Request } from "express";
import { ObjectId } from "mongodb";
import type { TagItem } from "./collectionsInterfaces.js";

export interface TMDBSearchMovieItem {
    genres: TagItem[],
    overview: string,
    poster_path: string,
    backdrop_path: string
    release_date: string,
    title: string
}

export interface TMDBSearchSerieItem {
    name: string
    posterHorizontal: string
    posterVertical: string
    overview: string
    releseDate: string
    tags: TagItem[]
    in_production: boolean
    status: string
}

export interface TMDBMovieSearchResult {
    results: TMDBSearchMovieItem[]
}

export interface TMDBSerie1SearchResult {
    results: TMDBSearchSerieItem[]
}

export default interface UserAuthRequest extends Request {
    user: ObjectId
}