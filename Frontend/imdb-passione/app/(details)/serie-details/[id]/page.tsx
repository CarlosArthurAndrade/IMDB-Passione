"use client"
import SerieDetailsPage from "@/components/(details)/serieDetailsPage";
import SerieDetailsPageService from "@/services/(details)/serieDetaisPageService";

export default function SerieDetails() {
    const {
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
        setSelectedReviewId
    } = SerieDetailsPageService()
    return(
        <SerieDetailsPage 
            serie={serie!}
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