import { ReviewCardProps } from "@/interfaces/(main-page)/mainPageInterfaces";
import { ProfilePageProps } from "@/interfaces/ui/InputProps";

export default function ProfileReviewCard({ title, movieName, text }: ReviewCardProps) {
    return(
        <div>
            <h1>{title}</h1>
            <p>{movieName}</p>
            <p>{text}</p>
        </div>
    )
}