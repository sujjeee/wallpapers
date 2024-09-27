"use client"

import React from "react"
import useVirtualScroll from "@/hooks/use-virtual-scroll"
import { useInView } from "react-intersection-observer"

export default function HomePage() {
  const [images, setImages] = React.useState<string[]>([])
  const { displayedItems, loadMore } = useVirtualScroll(images)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  React.useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/proxy")

        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }

        const data = await response.json()
        setImages(data.images) // You fetch all 700+ images here
      } catch (error) {
        console.error("Error fetching images:", error)
      }
    }

    fetchImages() // Fetch all images at once
  }, [])

  React.useEffect(() => {
    if (inView) {
      loadMore() // Load more items to display when the user scrolls
    }
  }, [inView, loadMore])

  return (
    <section className="flex items-center justify-center">
      <div className="space-y-2 py-4 sm:block columns-2 md:columns-3 gap-2 lg:columns-4 pb-28">
        {displayedItems.map((imageUrl, idx) => (
          <ImageWithSkeleton imageUrl={imageUrl} idx={idx} key={idx} />
        ))}
        <div ref={ref} style={{ height: "10px", background: "transparent" }} />
      </div>
    </section>
  )
}

// Skeleton loader component
const SkeletonLoader = () => {
  const randomHeight = Math.floor(Math.random() * (450 - 150 + 1)) + 150

  return (
    <div
      className="animate-pulse w-full bg-gray-200 rounded-xl"
      style={{ height: `${randomHeight}px` }}
    />
  )
}

// Component to handle image loading and skeleton display
const ImageWithSkeleton = ({ imageUrl, idx }: { imageUrl: any; idx: any }) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <div className="overflow-hidden rounded-xl cursor-pointer">
      <div className="size-full relative group">
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <picture>
            {!isLoaded && <SkeletonLoader />}{" "}
            <img
              src={imageUrl}
              alt={`Image ${idx + 1}`}
              className={`pointer-events-none w-full rounded-xl object-cover object-top ${
                !isLoaded ? "hidden" : "block"
              }`}
              onLoad={() => setIsLoaded(true)}
            />
          </picture>
        </a>
      </div>
    </div>
  )
}
