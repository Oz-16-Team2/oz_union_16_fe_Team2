import { useState } from 'react'

import { PostImageViewerModal } from './PostImageViewerModal'

type PostDetailBodyProps = {
  title: string
  content: string
  tags: string[]
  images: string[]
}

function getImageGridClass(count: number): string {
  if (count === 1) return 'mx-auto grid-cols-1 max-w-xl'
  if (count === 2) return 'grid-cols-2'
  return 'grid-cols-3'
}

type ImageFallbackProps = {
  className?: string
}

function ImageFallback({ className = '' }: ImageFallbackProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gray-100 text-xs text-text-muted ${className}`}
    >
      이미지를 불러올 수 없습니다
    </div>
  )
}

export function PostDetailBody({
  title,
  content,
  tags,
  images,
}: PostDetailBodyProps) {
  const visibleImages = images.slice(0, 3)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  )

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index))
  }

  const handleCloseImageViewer = () => {
    setSelectedImageIndex(null)
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? prev : (prev - 1 + images.length) % images.length
    )
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? prev : (prev + 1) % images.length
    )
  }

  return (
    <div className="space-y-4">
      {/* 이미지 영역 */}
      {visibleImages.length === 3 ? (
        <div className="flex h-72 gap-2">
          {/* 왼쪽 큰 이미지 */}
          <button
            type="button"
            className="flex-1 overflow-hidden rounded-xl bg-gray-100"
            onClick={() => setSelectedImageIndex(0)}
          >
            {!failedImages.has(0) ? (
              <img
                src={visibleImages[0]}
                alt="게시글 이미지 1"
                className="h-full w-full object-cover"
                loading="lazy"
                onError={() => handleImageError(0)}
              />
            ) : (
              <ImageFallback />
            )}
          </button>

          {/* 오른쪽 작은 이미지 2개 */}
          <div className="flex w-1/3 flex-col gap-2">
            {[1, 2].map((index) => (
              <button
                type="button"
                key={`img-${index}`}
                className="flex-1 overflow-hidden rounded-xl bg-gray-100"
                onClick={() => setSelectedImageIndex(index)}
              >
                {!failedImages.has(index) ? (
                  <img
                    src={visibleImages[index]}
                    alt={`게시글 이미지 ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <ImageFallback />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        visibleImages.length > 0 && (
          <div
            className={`grid gap-3 ${getImageGridClass(visibleImages.length)}`}
          >
            {visibleImages.map((image, index) => (
              <button
                type="button"
                key={`img-${index}`}
                className="h-72 w-full overflow-hidden rounded-xl bg-gray-100"
                onClick={() => setSelectedImageIndex(index)}
              >
                {!failedImages.has(index) ? (
                  <img
                    src={image}
                    alt={`게시글 이미지 ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <ImageFallback />
                )}
              </button>
            ))}
          </div>
        )
      )}

      {/* 제목 */}
      <h1 className="text-xl font-semibold text-text-primary">{title}</h1>

      {/* 내용 (빈 값이면 렌더 안함) */}
      {content && (
        <p className="whitespace-pre-wrap break-all text-sm leading-relaxed text-text-muted">
          {content}
        </p>
      )}

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1 text-xs text-text-muted">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="max-w-fit break-all rounded-md bg-gray-100 px-2 py-1 text-xs text-text-muted dark:bg-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {selectedImageIndex !== null && (
        <PostImageViewerModal
          images={images}
          currentIndex={selectedImageIndex}
          onClose={handleCloseImageViewer}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  )
}
