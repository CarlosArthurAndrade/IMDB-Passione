import { ObjectId, type WithId } from "mongodb";

export interface TagItem {
    name: string
}

export interface User extends WithId<Document> {
    username: string
    email: string
    password: string
    description: string
    image: string
}

export interface Movie extends WithId<Document> {
    title: string
    posterHorizontal: string
    posterVertical: string
    overview: string
    releseDate: string
    tags: TagItem[]
}

export interface Serie extends WithId<Document> {
    name: string
    posterHorizontal: string
    posterVertical: string
    overview: string
    releseDate: string
    tags: TagItem[]
    in_production: boolean
    status: string
}

export interface Review extends WithId<Document> {
    movieId: ObjectId
    userId: ObjectId
    title: string
    text: string
    rating: GLfloat
    likes: number
}

export interface Token extends WithId<Document> {
    userId: ObjectId
    tokenHash: string
    expiresAt: Date
}