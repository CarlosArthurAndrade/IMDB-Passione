"use client"
import SerieDetailsPage from "@/components/(details)/serieDetailsPage";
import SerieDetailsPageService from "@/services/(details)/serieDetaisPageService";

export default function SerieDetails() {
    const { serie, reviews, isOpen, onClose, onConfirm, setOpen } = SerieDetailsPageService()
    return(
        <SerieDetailsPage 
            serie={serie!}
            reviews={reviews!} 
            isOpen={isOpen} 
            onClose={onClose} 
            onConfirm={onConfirm} 
            setOpen={setOpen}
        />
    )
}