"use client"

import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

interface Image {
  id: string
  url: string
}

interface ResponseType {
  count: number
  data: Image[]
}

export default function HomePage() {
  const fetchImages = React.useCallback(
    async ({ pageParam }: { pageParam?: number }) => {
      const response = await fetch(`/api/images?page=${pageParam}`)

      const result: ResponseType = await response.json()
      return result
    },
    [],
  )

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length
      return nextPage * 10 < lastPage.count ? nextPage + 1 : undefined
    },
  })

  const images = data?.pages.flatMap((page) => page.data) || []

  // Function to handle intersection for lazy loading
  const lastImageRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return
      if (node) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage()
          }
        })
        observer.observe(node)
        return () => observer.disconnect()
      }
    },
    [isLoading, hasNextPage, fetchNextPage],
  )

  return (
    <section className="flex items-center justify-center">
      <div className="space-y-2 py-4 sm:block columns-2 md:columns-3 gap-2 lg:columns-4 pb-28">
        {images.map((image, idx) => (
          <div
            ref={idx === images.length - 1 ? lastImageRef : null}
            className="overflow-hidden rounded-xl "
            key={image.id}
          >
            <img
              src={`/api/proxy?url=${encodeURIComponent(image.url)}`}
              className="pointer-events-none w-full rounded-xl object-cover object-top"
            />
          </div>
        ))}

        {isLoading &&
          hasNextPage &&
          [...Array(6)].map((_, idx) => {
            const randomHeight =
              Math.floor(Math.random() * (450 - 150 + 1)) + 150
            return (
              <div
                key={`skeleton-${idx}`}
                className="overflow-hidden rounded-xl"
              >
                <Skeleton
                  className="w-full"
                  style={{ height: `${randomHeight}px` }}
                />
              </div>
            )
          })}
      </div>
    </section>
  )
}
