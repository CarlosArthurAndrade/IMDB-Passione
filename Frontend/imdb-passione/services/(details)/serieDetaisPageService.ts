"use client"
import { Serie, Review } from "@/interfaces/(main-page)/mainPageInterfaces"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { postData } from "../utils/httpRequests/httpRequests"

export default function SerieDetailsPageService() {
    const [serie, setSerie] = useState<Serie>()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [reviews, setReviews] = useState<Review[]>()
    const id = useParams<{ id: string }>().id

    const onClose = () => {
        setOpen(false)
    }

    const onConfirm = (text: string) => {
        console.log(text)
    }

    useEffect(() => {
        const token = window.localStorage.getItem("userId")
        const getSerie = async () => {
        const serieDetaisResponse = await postData<Serie>('https://imdb-passione-backend.vercel.app/series/serie-by-id', { id }, token!)
        const serieReviewsResponse = await postData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/serie-reviews', { serieId: id }, token!)
        setSerie(serieDetaisResponse?.data)
        setReviews(serieReviewsResponse?.data)
        }
        getSerie()
    }, [])

    return { serie, reviews, isOpen, onClose, onConfirm, setOpen }
}