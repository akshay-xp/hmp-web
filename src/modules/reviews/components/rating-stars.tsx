import { cn } from "@/lib/utils.ts"

export function RatingStars({
  rating,
  className,
}: {
  rating: number
  className?: string
}) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={cn(
            star <= rating ? "text-yellow-500" : "text-gray-300",
            className
          )}
        >
          ★
        </span>
      ))}
    </div>
  )
}
