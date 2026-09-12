export interface MobileMovieCardProps {
    title: string,
    posterHorizontal: string,
    rating: number,
    year: string,
    _id: string
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