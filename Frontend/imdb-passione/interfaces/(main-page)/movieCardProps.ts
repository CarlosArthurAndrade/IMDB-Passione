export interface MovieCardProps {
    title: string,
    posterHorizontal: string,
    posterVertical: string,
    rating: number,
    year: string,
    _id: string,
    isFirst: boolean,
    overview: string,
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