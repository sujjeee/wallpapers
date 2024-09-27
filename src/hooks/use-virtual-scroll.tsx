import { useState, useEffect, useCallback } from "react"

interface useInfiniteScrollProps {
  images: string[]
  perPage?: number
}

export function useInfiniteScroll({
  images,
  perPage = 10,
}: useInfiniteScrollProps) {
  const [displayedImages, setDisplayedImages] = useState<string[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const start = (page - 1) * perPage
    const end = page * perPage

    setDisplayedImages((prevDisplayedImages) => {
      const newItems = images.slice(start, end)
      const uniqueItems = newItems.filter(
        (imageUrl) => !prevDisplayedImages.includes(imageUrl),
      )
      return [...prevDisplayedImages, ...uniqueItems]
    })
  }, [images, page, perPage])

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1)
  }, [])

  return { displayedImages, loadMore }
}
