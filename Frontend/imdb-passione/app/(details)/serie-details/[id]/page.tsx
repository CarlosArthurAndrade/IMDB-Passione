import SerieDetailsPage from "@/components/(details)/serieDetailsPage";
import SerieDetailsPageService from "@/services/(details)/serieDetaisPageService";

export default function SerieDetails() {
    const { serie, reviews } = SerieDetailsPageService()
    return(
        <SerieDetailsPage serie={serie!} reviews={reviews!} />
    )
}