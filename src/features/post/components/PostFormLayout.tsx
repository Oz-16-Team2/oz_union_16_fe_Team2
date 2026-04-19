import { useRef, useState } from 'react'

import { ImagePlus, X } from 'lucide-react'

import { Button, Input, Textarea } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { usePostForm } from '../hooks/usePostForm'
import { MAX_CONTENT, MAX_IMAGES, MAX_TITLE } from '../post.constants'
import type { PostFormData, PostFormMode } from '../post.types'
import { PostGoalSection } from './PostGoalSection'
import { PostTagSection } from './PostTagSection'
import { PostVoteSection } from './PostVoteSection'
import { SectionLabel } from './SectionLabel'

type PostFormLayoutProps = {
  mode: PostFormMode
  defaultValues?: Partial<PostFormData>
  onSubmit: (data: PostFormData) => void
  onCancel?: () => void
  isPending?: boolean
}

export function PostFormLayout({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isPending = false,
}: PostFormLayoutProps) {
  const form = usePostForm(mode, defaultValues)

  // 드래그 시각 피드백
  const [isDragging, setIsDragging] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    form.addImages(Array.from(e.target.files ?? []))
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    )
    form.addImages(files)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.isSubmitDisabled || isPending) return
    onSubmit(form.buildFormData())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <SectionLabel label="제목" required />
        <Input
          placeholder="제목을 입력하세요"
          value={form.title}
          onChange={(e) => form.changeTitle(e.target.value)}
        />
        <p
          className={cn(
            'self-end text-xs',
            form.titleLen >= MAX_TITLE
              ? 'text-status-error-text'
              : 'text-text-muted'
          )}
        >
          {form.titleLen}/{MAX_TITLE}
        </p>
      </div>

      {/* 이미지 업로드 (hidden input) */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageSelect}
      />

      {/* 이미지 업로드 */}
      <div className="flex flex-col gap-2">
        <SectionLabel label="이미지 선택" />
        <div
          role="button"
          tabIndex={0}
          aria-label={`이미지 업로드 (최대 ${MAX_IMAGES}장)`}
          onClick={() => form.canAddImage && imageInputRef.current?.click()}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') &&
            imageInputRef.current?.click()
          }
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            'flex min-h-40 w-full flex-col rounded-2xl border-2 border-dashed p-4 transition-colors',
            isDragging
              ? 'border-focus-border bg-primary-100/30 dark:bg-primary-100/10'
              : 'border-border-default bg-gray-50 dark:bg-gray-800',
            form.canAddImage &&
              'cursor-pointer hover:border-focus-border hover:bg-gray-100 dark:hover:bg-gray-750'
          )}
        >
          {form.images.length === 0 ? (
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
                {form.images.map((src, i) => (
                  <div key={i} className="relative size-32 shrink-0">
                    <img
                      src={src}
                      alt={`첨부한 이미지 ${i + 1} 번째`}
                      className="size-full rounded-xl object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        form.removeImage(i)
                      }}
                      className="absolute -right-1.5 -top-1.5 flex size-6 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white shadow dark:bg-gray-600"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              {form.canAddImage && (
                <p className="text-text-muted">
                  {form.images.length}/{MAX_IMAGES}장 · 클릭하거나 드래그하여
                  추가
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-2">
        <SectionLabel label="내용" required />
        <Textarea
          size="lg"
          placeholder="내용을 입력하세요"
          value={form.content}
          onChange={(e) => form.changeContent(e.target.value)}
        />
        <p
          className={cn(
            'self-end text-xs',
            form.contentLen >= MAX_CONTENT
              ? 'text-status-error-text'
              : 'text-text-muted'
          )}
        >
          {form.contentLen}/{MAX_CONTENT}
        </p>
      </div>

      {/* 태그 선택 */}
      <div className="flex flex-wrap items-center gap-2">
        <SectionLabel label="태그 선택" />
        <PostTagSection
          selectedTagIds={form.selectedTagIds}
          onToggle={form.toggleTag}
        />
      </div>

      {/* 투표 생성 */}
      <PostVoteSection
        mode={mode}
        question={form.voteQuestion}
        options={form.voteOptions}
        period={form.votePeriod}
        onChangeQuestion={form.changeVoteQuestion}
        onChangeOption={form.changeVoteOption}
        onChangePeriod={form.changeVotePeriod}
        onConfirm={form.confirmVote}
      />

      {/* 목표 선택 */}
      <div className="flex flex-col gap-3">
        <SectionLabel label="목표 선택" />
        <PostGoalSection
          mode={mode}
          selectedGoalId={form.selectedGoalId}
          onChange={form.changeGoal}
        />
      </div>

      {/* 등록 or 수정 버튼 */}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="modal" size="md" rounded="md" onClick={onCancel}>
          취소
        </Button>
        <Button
          type="submit"
          variant="secondary"
          size="md"
          rounded="md"
          disabled={form.isSubmitDisabled || isPending}
        >
          {isPending ? '처리 중...' : mode === 'edit' ? '수정' : '등록'}
        </Button>
      </div>
    </form>
  )
}
