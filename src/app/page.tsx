"use client"

import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export default function HomePage() {
  const images = [
    "https://images.unsplash.com/photo-1696533424255-fec524509388?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1697219877546-5d8efced181d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704137893005-99736147b6aa?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1701887714736-9e848ca04634?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1726947032558-a4dec186c2f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1700765717876-a1a22358f6ba?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]

  return (
    <section className="p-2.5 sm:container sm:max-w-screen-xl flex items-center justify-center">
      <div className="space-y-2 py-8 sm:block sm:columns-2 md:columns-3 sm:gap-2 lg:columns-4 pb-28">
        {images.map((src, idx) => (
          <div className="overflow-hidden rounded-xl space-y-2" key={idx}>
            <img
              src={src}
              className="pointer-events-none size-full rounded-xl object-cover object-top"
            />
          </div>
        ))}

        {true &&
          [...Array(10)].map((_, idx) => {
            const randomHeight =
              Math.floor(Math.random() * (450 - 150 + 1)) + 150

            return (
              <div key={idx} className="overflow-hidden rounded-xl">
                <Skeleton
                  className={`w-full `}
                  style={{ height: `${randomHeight}px` }}
                />
              </div>
            )
          })}
      </div>
    </section>
  )
}
