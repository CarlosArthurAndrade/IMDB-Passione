export interface MobileMovieCardProps {
    title: string,
    posterHorizontal: string,
    rating: number,
    year: string,
    _id: string,
    isFirst: boolean
}

export interface MovieCardProps {
    _id: string,
    title: string,
    posterVertical: string,
    rating: number,
    year: string
}

export interface TagItem {
    name: string
}

export interface Movie {
    _id: string,
    title: string,
    posterHorizontal: string,
    posterVertical: string,
    overview: string,
    rating: number,
    releaseDate: string,
    tags: TagItem[]
}