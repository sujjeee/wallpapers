"use client"

import React from "react"
import useVirtualScroll from "@/hooks/use-virtual-scroll"
import { useInView } from "react-intersection-observer"
import { ImageShell } from "@/components/image-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [images, setImages] = React.useState<string[]>([])
  const { displayedItems, loadMore } = useVirtualScroll(images)
  const [loading, setLoading] = React.useState<boolean>(true)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  React.useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        const response = await fetch("/api/proxy")

        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }

        const data = await response.json()
        setImages(data.images)
      } catch (error) {
        console.error("Error fetching images:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  React.useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView, loadMore])

  return (
    <section className="flex items-center justify-center">
      <div className="space-y-2 py-4 sm:block columns-2 md:columns-3 gap-2 lg:columns-4 pb-28">
        {loading
          ? [...Array(20)].map((_, idx) => {
              const randomHeight =
                Math.floor(Math.random() * (450 - 150 + 1)) + 150
              return (
                <div key={idx} className="overflow-hidden rounded-xl w-full">
                  <Skeleton
                    className="w-[300px]"
                    style={{ height: `${randomHeight}px` }}
                  />
                </div>
              )
            })
          : displayedItems.map((imageUrl, idx) => (
              <ImageShell imageUrl={imageUrl} idx={idx} key={idx} />
            ))}
        <div ref={ref} style={{ height: "10px", background: "transparent" }} />
      </div>
    </section>
  )
}
