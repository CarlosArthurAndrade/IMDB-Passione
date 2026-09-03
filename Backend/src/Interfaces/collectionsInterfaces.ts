import { ObjectId, WithId } from "mongodb";
import { TagItem } from "./utils";

export interface User extends WithId<Document> {
    username: string,
    email: string,
    password: string,
    description: string,
    image: string,
}

export interface Movie extends WithId<Document> {
    title: string,
    posterHorizontal: string,
    posterVertical: string,
    overview: string,
    releseDate: string
    tags: TagItem[]
}

export interface Review extends WithId<Document> {
    movieId: ObjectId,
    userId: ObjectId,
    title: string,
    text: string,
    rating: GLfloat,
    likes: number
}

export interface Requests extends WithId<Document> {
    userId: string,
    title: string,
    description: string,
    releaseYear: number
}

export interface Token extends WithId<Document> {
    userId: ObjectId,
    tokenHash: string,
    expiresAt: Date,
}