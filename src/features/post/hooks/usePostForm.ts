import { useState } from 'react'

import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

import {
  MAX_CONTENT,
  MAX_IMAGES,
  MAX_TAGS,
  MAX_TITLE,
  MAX_VOTE_OPTION,
  MAX_VOTE_QUESTION,
} from '../post.constants'
import type { PostFormData, PostFormMode } from '../post.types'

function charLen(str: string) {
  return Array.from(str).length
}

export function usePostForm(
  mode: PostFormMode,
  defaultValues?: Partial<PostFormData>
) {
  // ── 기본 필드 ─────────────────────────────────────────────
  const [title, setTitle] = useState(defaultValues?.title ?? '')
  const [content, setContent] = useState(defaultValues?.content ?? '')
  const [images, setImages] = useState<string[]>(defaultValues?.images ?? [])

  // ── 태그 ─────────────────────────────────────────────────
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    defaultValues?.tagIds ?? []
  )

  // ── 투표 ─────────────────────────────────────────────────
  const [voteQuestion, setVoteQuestion] = useState(
    defaultValues?.vote?.question ?? ''
  )
  const [voteOptions, setVoteOptions] = useState<string[]>(
    defaultValues?.vote?.options.map((o) => o.content) ?? ['', '']
  )
  // TODO: 투표 선생성 플로우 확정 시 votePeriod를 PostFormData.vote에 포함시켜야 함
  // 현재는 VoteEditor UI 표시 전용으로만 사용되며 buildFormData()에 포함되지 않음
  // → post.types.ts의 VoteFormData에 startAt/endAt 추가 및 buildFormData() 수정 필요
  const [votePeriod, setVotePeriod] = useState<DateRange | undefined>()
  const [voteConfirmed, setVoteConfirmed] = useState(
    mode === 'edit' && !!defaultValues?.vote
  )

  // ── 목표 ─────────────────────────────────────────────────
  const [selectedGoalId, setSelectedGoalId] = useState<number | undefined>(
    mode === 'edit' ? defaultValues?.goalId : undefined
  )

  // ── 기타 — 마운트 시 확정되는 값이므로 상태가 아닌 상수로 관리 ──
  const postId = defaultValues?.postId

  // ── 파생 값 ──────────────────────────────────────────────
  const titleLen = charLen(title)
  const contentLen = charLen(content)
  const isSubmitDisabled = title.trim() === '' || content.trim() === ''
  const canAddImage = images.length < MAX_IMAGES

  // ── 액션: 제목 / 내용 ─────────────────────────────────────
  function changeTitle(val: string) {
    if (charLen(val) <= MAX_TITLE) setTitle(val)
  }

  function changeContent(val: string) {
    if (charLen(val) <= MAX_CONTENT) setContent(val)
  }

  // ── 액션: 이미지 ──────────────────────────────────────────
  function addImages(files: File[]) {
    const remaining = MAX_IMAGES - images.length
    const urls = files.slice(0, remaining).map(URL.createObjectURL)
    setImages((prev) => [...prev, ...urls])
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const url = prev[index]
      // blob URL인 경우에만 revoke (서버 URL은 no-op 방지)
      if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      return prev.filter((_, i) => i !== index)
    })
  }

  // ── 액션: 태그 ────────────────────────────────────────────
  function toggleTag(id: number) {
    setSelectedTagIds((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id)
      if (prev.length >= MAX_TAGS) return prev
      return [...prev, id]
    })
  }

  // ── 액션: 투표 ────────────────────────────────────────────
  function changeVoteQuestion(question: string) {
    if (charLen(question) <= MAX_VOTE_QUESTION) {
      setVoteQuestion(question)
      setVoteConfirmed(false)
    }
  }

  function changeVoteOption(index: number, value: string) {
    if (charLen(value) <= MAX_VOTE_OPTION) {
      setVoteOptions((prev) => prev.map((o, i) => (i === index ? value : o)))
      setVoteConfirmed(false)
    }
  }

  function changeVotePeriod(date: DateRange | null) {
    setVotePeriod(date ?? undefined)
    setVoteConfirmed(false)
  }

  function confirmVote() {
    setVoteConfirmed(true)
  }

  // ── 액션: 목표 ────────────────────────────────────────────
  function changeGoal(goalId: number | undefined) {
    setSelectedGoalId(goalId)
  }

  // ── 최종 payload 빌드 ─────────────────────────────────────
  function buildFormData(): PostFormData {
    const base: Omit<PostFormData, 'postId' | 'vote'> = {
      title: title.trim(),
      content: content.trim(),
      images,
      hasGoal: selectedGoalId !== undefined,
      goalId: selectedGoalId,
      hasVote: voteConfirmed,
      tagIds: selectedTagIds,
    }

    if (mode === 'edit') {
      // edit 모드에서 postId가 없는 것은 프로그래밍 오류
      if (postId === undefined) {
        throw new Error('[usePostForm] edit 모드에서 postId는 필수입니다.')
      }
      // PATCH 스펙: vote 필드 미포함. API 변환(post_id 등)은 호출부(Page)에서 처리
      return { postId, ...base }
    }

    // POST 스펙: vote 포함
    return {
      ...base,
      vote: voteConfirmed
        ? {
            question: voteQuestion,
            options: voteOptions.map((c, i) => ({ content: c, sortOrder: i })),
          }
        : undefined,
    }
  }

  return {
    // state
    title,
    content,
    images,
    selectedTagIds,
    voteQuestion,
    voteOptions,
    votePeriod,
    selectedGoalId,
    // 파생
    titleLen,
    contentLen,
    isSubmitDisabled,
    canAddImage,
    // 액션
    changeTitle,
    changeContent,
    addImages,
    removeImage,
    toggleTag,
    changeVoteQuestion,
    changeVoteOption,
    changeVotePeriod,
    confirmVote,
    changeGoal,
    buildFormData,
  }
}
