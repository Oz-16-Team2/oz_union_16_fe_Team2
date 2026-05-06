import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type PostImageViewerModalProps = {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function PostImageViewerModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: PostImageViewerModalProps) {
  const hasMultipleImages = images.length > 1

  return (
    <div
      className="group fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4 pb-20 pt-10 sm:px-12"
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        type="button"
        className="fixed right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-overlay text-text-inverse transition active:scale-90 sm:right-6 sm:top-6"
        aria-label="이미지 전체보기 닫기"
        onClick={onClose}
      >
        <X size={22} />
      </button>

      {/* 이미지 영역 */}
      <div className="flex w-full items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`게시글 이미지 ${currentIndex + 1}`}
          className="max-h-[80vh] w-full rounded-xl object-contain"
          onClick={(event) => event.stopPropagation()}
        />
      </div>

      {/* 하단 이미지 이동 컨트롤 */}
      {hasMultipleImages && (
        <div
          className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full px-3 py-1.5 text-text-inverse transition md:opacity-0 md:group-hover:opacity-100"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full bg-overlay transition active:scale-90"
            aria-label="이전 이미지 보기"
            onClick={onPrev}
          >
            <ChevronLeft size={20} />
          </button>

          <span className="min-w-10 text-center text-sm">
            {currentIndex + 1} / {images.length}
          </span>

          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full bg-overlay transition active:scale-90"
            aria-label="다음 이미지 보기"
            onClick={onNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
