import { useState } from 'react'

type PostDetailBodyProps = {
  title: string
  content: string
  tags: string[]
  images: string[]
}

function getImageGridClass(count: number): string {
  if (count === 1) return 'grid-cols-1 max-w-xl'
  if (count === 2) return 'grid-cols-2'
  return 'grid-cols-3'
}

export function PostDetailBody({
  title,
  content,
  tags,
  images,
}: PostDetailBodyProps) {
  const visibleImages = images.slice(0, 3)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index))
  }

  return (
    <div className="space-y-4">
      {visibleImages.length > 0 && (
        <div
          className={`grid gap-3 ${getImageGridClass(visibleImages.length)}`}
        >
          {visibleImages.map((image, index) => {
            if (failedImages.has(index)) return null

            return (
              <img
                key={image}
                src={image}
                alt={`게시글 이미지 ${index + 1}`}
                className="aspect-4/3 w-full rounded-xl object-cover"
                loading="lazy"
                onError={() => handleImageError(index)}
              />
            )
          })}
        </div>
      )}

      <h1 className="text-lg font-semibold text-text-primary">{title}</h1>

      <p className="text-sm text-text-muted">{content}</p>

      <div className="flex gap-2 text-xs text-text-primary">
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`}>#{tag}</span>
        ))}
      </div>
    </div>
  )
}
