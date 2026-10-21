import { ReviewCardProps } from "@/interfaces/(main-page)/mainPageInterfaces";

export default function ProfileReviewCard(review: ReviewCardProps) {
    return (
        <article className="w-full sm:max-w-2xl lg:max-w-4xl rounded-2xl border border-white/60 bg-white/60 p-4 shadow-lg shadow-orange-900/10 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-black/30 sm:p-5">
            <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="font-medium text-neutral-900 dark:text-white">
                            {review.profile ? review.showName : review.username }
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-white/50">
                            {review.createdAt}
                        </p>
                    </div>
                </div>

                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    <span className="text-amber-500 dark:text-amber-400">★</span>{" "}
                    {review.rating.toFixed(1)}
                </span>
            </header>

            <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-white/80 line-clamp-4">
                {review.text}
            </p>
        </article>
    )
}