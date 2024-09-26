"use client"

import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { showErrorToast } from "@/lib/error"
import { toast } from "sonner"

interface Image {
  id: string
  url: string
}

interface ResponseType {
  count: number
  data: Image[]
}

export default function HomePage() {
  const [_, setIsDeleting] = React.useState(false)

  const [token, setToken] = React.useState<string | null>(null)

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  }, [])

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

  async function onDelete(imageId: string) {
    setIsDeleting(true)
    try {
      if (!token) {
        throw new Error("Unauthorized")
      }

      const response = await fetch(`/api/images/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Error: ${data.message}`)
      }

      toast.success("Image deleted successfully")
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="flex items-center justify-center">
      <div className="space-y-2 py-4 sm:block columns-2 md:columns-3 gap-2 lg:columns-4 pb-28">
        {images.map((image, idx) => (
          <div
            ref={idx === images.length - 1 ? lastImageRef : null}
            className="overflow-hidden rounded-xl cursor-pointer"
            key={image.id}
          >
            <div className="size-full relative group ">
              <a href={image.url} target="_blank">
                <img
                  src={`/api/proxy?url=${encodeURIComponent(image.url)}`}
                  className="pointer-events-none w-full rounded-xl object-cover object-top"
                />
              </a>
              <Button
                onClick={() => onDelete(image.id)}
                size={"icon"}
                className="absolute top-0 right-0 text-white rounded-full bg-transparent hover:bg-transparent hover:text-red-500 group-hover:flex hidden"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ))}

        {(isLoading || hasNextPage) &&
          [...Array(6)].map((_, idx) => {
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
          })}
      </div>
    </section>
  )
}
