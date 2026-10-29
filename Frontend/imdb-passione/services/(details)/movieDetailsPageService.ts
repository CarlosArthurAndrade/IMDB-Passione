import { Movie, Review } from "@/interfaces/(main-page)/mainPageInterfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postData } from "../utils/httpRequests/httpRequests";

export default function MovieDetailsPageService() {
    const [movie, setMovie] = useState<Movie>()
    const [reviews, setReviews] = useState<Review[]>()
    const id = useParams<{ id: string }>().id

    useEffect(() => {
        const token = window.localStorage.getItem("userId")
        const getMovie = async () => {
        const movieDetaisResponse = await postData<Movie>('https://imdb-passione-backend.vercel.app/movies/movie-by-id', { id }, token!)
        const movieReviewsResponse = await postData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/movie-reviews', { movieId: id }, token!)
        setMovie(movieDetaisResponse?.data)
        setReviews(movieReviewsResponse?.data)
    }
    getMovie()
    }, [])

    return { movie, reviews }
}