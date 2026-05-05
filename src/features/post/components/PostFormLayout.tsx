import { Button, Input, Textarea } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { usePostForm } from '../hooks/usePostForm'
import { MAX_CONTENT, MAX_TITLE } from '../post.constants'
import type { PostFormData, PostFormMode } from '../post.types'
import {
  PostGoalSection,
  PostImageSection,
  PostTagSection,
  PostVoteSection,
  SectionLabel,
} from '.'

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form.buildFormData())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      {/* 이미지 업로드 */}
      <div className="flex flex-col gap-2">
        <SectionLabel label="이미지 선택" />
        <PostImageSection
          imageItems={form.imageItems}
          canAddImage={form.canAddImage}
          onAddImages={form.addImages}
          onResolveImages={form.resolveImages}
          onRemoveImages={form.removeImages}
          onRemoveImage={form.removeImage}
        />
      </div>

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
      <div className="flex flex-wrap items-center gap-2 min-h-8">
        <SectionLabel label="태그 선택" />
        <PostTagSection
          selectedTagIds={form.selectedTagIds}
          onToggle={form.toggleTag}
          defaultTagNames={defaultValues?.tagNames}
          onInitialize={form.initializeTags}
        />
      </div>

      {/* 투표 생성 */}
      <div className="flex flex-col gap-3">
        <SectionLabel label="투표 관리" />
        <PostVoteSection
          mode={mode}
          options={form.voteOptions}
          period={form.votePeriod}
          onChangeOption={form.changeVoteOption}
          onChangePeriod={form.changeVotePeriod}
          isExistingVoteLocked={form.isExistingVoteLocked}
        />
      </div>

      {/* 목표 선택 */}
      <div className="flex flex-col gap-3">
        <SectionLabel label="목표 선택" />
        <PostGoalSection
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
