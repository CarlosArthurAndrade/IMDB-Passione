import { stars } from "@/utils/starsData";

export default function DarkBackground() {
    return(
        <div
        aria-hidden
        className="pointer-events-none inset-0 -z-10 overflow-hidden absolute inset-0 z-0 dark:block hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(123, 47, 247, 0.28), transparent 45%),
            radial-gradient(circle at 85% 15%, rgba(58, 134, 255, 0.18), transparent 40%),
            radial-gradient(circle at 80% 88%, rgba(199, 125, 255, 0.18), transparent 45%),
            radial-gradient(circle at 10% 90%, rgba(90, 24, 154, 0.22), transparent 40%)
          `,
        }}
      >
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: star.color === "purple" ? "#C77DFF" : "#ffffff",
              animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
            }}
          />
        ))}
      </div>
    )
}