import { Skeleton } from "./ui/skeleton"

export function SkeletonLoader() {
  const randomHeight = Math.floor(Math.random() * (450 - 150 + 1)) + 150

  return (
    <Skeleton
      className="w-fullrounded-xl"
      style={{ height: `${randomHeight}px` }}
    />
  )
}
