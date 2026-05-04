import { useRef, useState } from 'react'

import { ImagePlus, Loader2, X } from 'lucide-react'

import { useToast } from '@/components/common/ui'
import { cn } from '@/utils/cn'
import { uploadFilesToS3 } from '@/utils/uploadToS3'

import { MAX_IMAGES } from '../post.constants'
import type { PostImageItem } from '../post.types'

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
]

type PostImageSectionProps = {
  imageItems: PostImageItem[]
  canAddImage: boolean
  onAddImages: (files: File[]) => string[]
  onResolveImages: (blobUrls: string[], imageUrls: string[]) => void
  onRemoveImages: (blobUrls: string[]) => void
  onRemoveImage: (index: number) => void
}

export function PostImageSection({
  imageItems,
  canAddImage,
  onAddImages,
  onResolveImages,
  onRemoveImages,
  onRemoveImage,
}: PostImageSectionProps) {
  const toast = useToast()
  const [isDragging, setIsDragging] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  async function uploadImages(files: File[]) {
    const imageFiles = files.filter((f) => ALLOWED_IMAGE_TYPES.includes(f.type))
    if (imageFiles.length === 0 || !canAddImage) return

    if (imageFiles.length < files.length) {
      toast.error('JPEG, PNG, GIF, WEBP 형식의 이미지만 업로드할 수 있습니다.')
    }

    const blobUrls = onAddImages(imageFiles)
    const filesToUpload = imageFiles.slice(0, blobUrls.length)

    try {
      const imageUrls = await uploadFilesToS3(filesToUpload)
      onResolveImages(blobUrls, imageUrls)
    } catch {
      onRemoveImages(blobUrls)
      toast.error('이미지 업로드에 실패했습니다.')
    }
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    uploadImages(files)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    uploadImages(Array.from(e.dataTransfer.files))
  }

  return (
    <>
      <div
        role="button"
        aria-label={`이미지 업로드 (최대 ${MAX_IMAGES}장)`}
        onClick={() => canAddImage && imageInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          if (canAddImage) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        className={cn(
          'flex min-h-40 w-full flex-col rounded-2xl border-2 border-dashed p-4 transition-colors',
          isDragging
            ? 'border-focus-border bg-primary-100/30 dark:bg-primary-100/10'
            : 'border-border-default bg-gray-50 dark:bg-gray-800',
          canAddImage &&
            'cursor-pointer hover:border-focus-border hover:bg-gray-100 dark:hover:bg-gray-750'
        )}
      >
        {imageItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-text-muted">
            <ImagePlus className="size-8" />
            <span className="text-sm">
              클릭 또는 드래그하여 이미지를 추가하세요
            </span>
            <span className="text-xs text-text-disabled">
              최대 {MAX_IMAGES}장
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              {imageItems.map((item, i) => (
                <div
                  key={item.previewUrl}
                  className="relative size-32 shrink-0"
                >
                  <img
                    src={item.previewUrl}
                    alt={`첨부한 이미지 ${i + 1} 번째`}
                    className="size-full rounded-xl object-cover"
                  />
                  {item.imageUrl === null ? (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                      <Loader2 className="size-6 animate-spin text-white" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveImage(i)
                      }}
                      className="absolute -right-1.5 -top-1.5 flex size-6 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white shadow dark:bg-gray-600"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {canAddImage && (
              <p className="text-text-muted">
                {imageItems.length}/{MAX_IMAGES}장
              </p>
            )}
          </div>
        )}
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        className="hidden"
        onChange={handleImageSelect}
      />
    </>
  )
}
