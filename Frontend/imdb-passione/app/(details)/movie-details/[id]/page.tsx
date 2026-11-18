"use client"
import MovieDetailsPage from "@/components/(details)/movieDetailsPage"
import MovieDetailsPageService from "@/services/(details)/movieDetailsPageService"

export default function MovieDetails() {
    const { 
        movie, 
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
        setSelectedReviewId
    } = MovieDetailsPageService()
    return(
        <MovieDetailsPage 
            movie={movie!} 
            reviews={reviews!} 
            isOpenCreate={isOpenCreate}
            isOpenDelete={isOpenDelete}
            isOpenEdit={isOpenEdit}
            onCloseCreate={() => setOpenCreate(false)}
            onCloseDelete={() => setOpenDelete(false)}
            onCloseEdit={() => setOpenEdit(false)}
            onConfirmCreate={createReview} 
            onConfirmDelete={deleteReview}
            onConfirmEdit={editReview}
            setOpenCreate={setOpenCreate}
            setOpenDelete={setOpenDelete}
            setOpenEdit={setOpenEdit}
            initialRating={initialRating}
            initialReview={initialReview}
            setInitialRating={setInitialRating}
            setInitialReview={setInitialReview}
            setSelectedReviewId={setSelectedReviewId}
        />
    )
}