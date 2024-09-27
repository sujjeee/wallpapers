"use client"

import { useState, useEffect, useCallback } from "react"

const useVirtualScroll = (allItems: string[], itemsPerPage = 10) => {
  const [displayedItems, setDisplayedItems] = useState<string[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const end = page * itemsPerPage
    setDisplayedItems(allItems.slice(0, end))
  }, [allItems, page, itemsPerPage])

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1)
  }, [])

  return { displayedItems, loadMore }
}

export default useVirtualScroll
