export default function EmptyReviews() {
    return (
        <div className="mx-auto mt-4 flex w-full max-w-md lg:max-w-full flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-300/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11a.56.56 0 0 0 .47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 0 0-.18.56l1.29 5.38a.56.56 0 0 1-.84.61l-4.73-2.89a.56.56 0 0 0-.58 0l-4.73 2.89a.56.56 0 0 1-.84-.61l1.29-5.38a.56.56 0 0 0-.18-.56l-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .47-.35l2.13-5.11Z"
                />
            </svg>
            <p className="text-base font-medium text-white">
                Ainda não há reviews publicadas
            </p>
            <p className="text-sm text-white/60">
                Seja o primeiro a compartilhar sua opinião!
            </p>
        </div>
    )
}