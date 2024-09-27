import React from "react"
import { SkeletonLoader } from "./loader"

interface ImageShellProps {
  imageUrl: string
  idx: number
}

export function ImageShell({ imageUrl, idx }: ImageShellProps) {
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
