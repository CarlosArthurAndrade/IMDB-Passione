import { ReviewCardProps } from "@/interfaces/(main-page)/mainPageInterfaces";

export default function ReviewCard({ title }: { title: string}) {
    return(
        <div>
            <h1>{title}</h1>
        </div>
    )
}