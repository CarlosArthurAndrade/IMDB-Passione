import { ReviewCardProps } from "@/interfaces/(main-page)/mainPageInterfaces";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ProfileReviewCard(review: ReviewCardProps) {
    return (
        <article className="w-full rounded-2xl border border-white/60 bg-white/60 p-4 shadow-lg shadow-orange-900/10 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-black/30 sm:p-5">
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

            <div className="mt-3 flex items-center justify-between gap-3">
                <p className="flex-1 text-sm leading-relaxed text-neutral-700 dark:text-white/80 line-clamp-4">
                    {review.text}
                </p>

                <div className="flex shrink-0 items-center gap-1.5">
                    <button
                        type="button"
                        aria-label="Editar avaliação"
                        title="Editar"
                        onClick={() => review.handleEdit()}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white/60 text-neutral-500 transition-all duration-200 hover:scale-110 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:border-purple-400/50 dark:hover:text-purple-300"
                    >
                        <FiEdit2 size={14} />
                    </button>

                    <button
                        type="button"
                        aria-label="Excluir avaliação"
                        title="Excluir"
                        onClick={() => review.handleDelete()}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white/60 text-neutral-500 transition-all duration-200 hover:scale-110 hover:border-red-400 hover:bg-red-500/10 hover:text-red-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:border-red-400/50 dark:hover:text-red-400"
                    >
                        <FiTrash2 size={14} />
                    </button>
                </div>
            </div>
        </article>
    )
}