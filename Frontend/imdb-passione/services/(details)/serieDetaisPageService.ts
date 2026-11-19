"use client"
import { Serie, Review } from "@/interfaces/(main-page)/mainPageInterfaces"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { deleteData, postData, updateData } from "../utils/httpRequests/httpRequests"

export default function SerieDetailsPageService() {
    const [serie, setSerie] = useState<Serie>()
    const [isOpenCreate, setOpenCreate] = useState<boolean>(false)
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false)
    const [initialReview, setInitialReview] = useState<string>("")
    const [initialRating, setInitialRating] = useState<number>(0)
    const [selectedReviewId, setSelectedReviewId] = useState<String>()
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false)
    const [reviews, setReviews] = useState<Review[]>([])
    const id = useParams<{ id: string }>().id

    const fetchReviews = async () => {
            const token = window.localStorage.getItem("userId")
            const res = await postData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/serie-reviews', { showId: id }, token!)
            setReviews(res?.data? res.data : [])
        }
    
        const createReview = async (text: string, rating: number) => {
            const token = window.localStorage.getItem("userId")
            const newReview = {
                showName: serie?.name,
                showId: id,
                text,
                rating,
            }
            const response = await postData('https://imdb-passione-backend.vercel.app/reviews/new-review', newReview, token!)
    
            if (response) {
                await fetchReviews()
                setOpenCreate(false)
            }
        }
    
        const deleteReview = async () => {
            const token = window.localStorage.getItem("userId")
            const response = await deleteData('https://imdb-passione-backend.vercel.app/reviews/delete-review', { reviewId: selectedReviewId }, token!)
    
            if(response) {
                fetchReviews()
                setOpenDelete(false)
            }
        }
    
        const editReview = async (text: string, rating: number) => {
            const token = window.localStorage.getItem("userId")
            const body = { text, rating, reviewId: selectedReviewId }
            const response = await updateData('https://imdb-passione-backend.vercel.app/reviews/edit-review', body, token!)
    
            if(response){
                fetchReviews()
                setOpenEdit(false)
            }
        }
    
        useEffect(() => {
            const token = window.localStorage.getItem("userId")
            const getSerie = async () => {
                const serieRes = await postData<Serie>('https://imdb-passione-backend.vercel.app/series/serie-by-id', { id }, token!)
                setSerie(serieRes?.data)
            }
            getSerie()
            fetchReviews()
        }, [])

    return { 
        serie, 
        reviews, 
        createReview, 
        editReview, 
        deleteReview, 
        isOpenCreate,
        isOpenDelete, 
        isOpenEdit, 
        setOpenCreate, 
        setOpenEdit, 
        setOpenDelete,
        initialRating,
        initialReview,
        setInitialRating,
        setInitialReview,
        selectedReviewId,
        setSelectedReviewId
    }
}