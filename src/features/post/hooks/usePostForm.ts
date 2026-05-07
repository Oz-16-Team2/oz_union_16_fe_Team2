import { useEffect, useRef, useState } from 'react'

import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

import {
  MAX_CONTENT,
  MAX_IMAGES,
  MAX_TAGS,
  MAX_TITLE,
  MAX_VOTE_OPTION,
} from '../post.constants'
import type { PostFormData, PostFormMode, PostImageItem } from '../post.types'

function charLen(str: string) {
  return Array.from(str).length
}

export function usePostForm(
  mode: PostFormMode,
  defaultValues?: Partial<PostFormData>
) {
  // 기본 필드
  const [title, setTitle] = useState(defaultValues?.title ?? '')
  const [content, setContent] = useState(defaultValues?.content ?? '')

  // edit 모드에서 기존 투표가 있으면 수정 페이지에서는 투표 수정 불가
  // 기존 투표 수정은 게시글 상세페이지의 투표 더보기 메뉴에서 처리
  const initialHasVote = mode === 'edit' && Boolean(defaultValues?.hasVote)
  const isExistingVoteLocked = mode === 'edit' && initialHasVote

  // 이미지: edit 모드의 기존 이미지는 imageUrl이 이미 확정된 상태
  const [imageItems, setImageItems] = useState<PostImageItem[]>(
    (defaultValues?.images ?? []).map((url) => ({
      previewUrl: url,
      imageUrl: url,
    }))
  )

  // 언마운트 시 revoke할 blob URL 추적
  const blobUrlsRef = useRef<string[]>([])

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  // 태그 — 초기 선택은 PostTagSection이 tagNames를 보고 initializeTags로 설정
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const tagInitializedRef = useRef(false)

  function initializeTags(ids: number[]) {
    if (tagInitializedRef.current) return
    tagInitializedRef.current = true
    setSelectedTagIds(ids)
  }

  // 투표
  const [voteOptions, setVoteOptions] = useState<string[]>(
    defaultValues?.vote?.options ?? ['', '']
  )
  const [votePeriod, setVotePeriod] = useState<DateRange | undefined>(() => {
    if (mode !== 'edit' || !defaultValues?.vote) return undefined
    const { startDate, endDate } = defaultValues.vote
    if (!startDate || !endDate) return undefined
    return { start: new Date(startDate), end: new Date(endDate) }
  })
  const [votePeriodError, setVotePeriodError] = useState('')

  // 목표
  const [selectedGoalId, setSelectedGoalId] = useState<number | undefined>(
    mode === 'edit' ? defaultValues?.goalId : undefined
  )

  // 마운트 시 확정되는 값이므로 상태가 아닌 상수로 관리
  const postId = defaultValues?.postId

  // 파생 값
  const titleLen = charLen(title)
  const contentLen = charLen(content)
  const isUploading = imageItems.some((item) => item.imageUrl === null)
  const isSubmitDisabled =
    title.trim() === '' || content.trim() === '' || isUploading
  const canAddImage = imageItems.length < MAX_IMAGES

  // 제목 / 내용
  function changeTitle(val: string) {
    if (charLen(val) <= MAX_TITLE) setTitle(val)
  }

  function changeContent(val: string) {
    if (charLen(val) <= MAX_CONTENT) setContent(val)
  }

  // 이미지 추가: blob URL 생성 후 imageUrl=null(업로드 중)로 추가, blob URL 목록 반환
  function addImages(files: File[]): string[] {
    const remaining = MAX_IMAGES - imageItems.length
    const sliced = files.slice(0, remaining)
    const newItems = sliced.map((file) => {
      const previewUrl = URL.createObjectURL(file)
      blobUrlsRef.current.push(previewUrl)
      return { previewUrl, imageUrl: null }
    })

    setImageItems((prev) => [...prev, ...newItems])

    return newItems.map((item) => item.previewUrl)
  }

  // S3 업로드 완료: blob URL → image_url로 갱신
  function resolveImages(blobUrls: string[], imageUrls: string[]) {
    setImageItems((prev) =>
      prev.map((item) => {
        const idx = blobUrls.indexOf(item.previewUrl)
        if (idx === -1) return item
        return { ...item, imageUrl: imageUrls[idx] }
      })
    )
  }

  // S3 업로드 실패: 해당 이미지 제거
  function removeImages(blobUrls: string[]) {
    blobUrls.forEach((url) => {
      URL.revokeObjectURL(url)
      blobUrlsRef.current = blobUrlsRef.current.filter((u) => u !== url)
    })

    setImageItems((prev) =>
      prev.filter((item) => !blobUrls.includes(item.previewUrl))
    )
  }

  // X 버튼으로 단일 이미지 제거
  function removeImage(index: number) {
    const item = imageItems[index]

    if (item?.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(item.previewUrl)
      blobUrlsRef.current = blobUrlsRef.current.filter(
        (u) => u !== item.previewUrl
      )
    }

    setImageItems((prev) => prev.filter((_, i) => i !== index))
  }

  // 태그
  function toggleTag(id: number) {
    setSelectedTagIds((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id)
      if (prev.length >= MAX_TAGS) return prev
      return [...prev, id]
    })
  }

  // 투표
  function changeVoteOption(index: number, value: string) {
    if (isExistingVoteLocked) return

    if (charLen(value) <= MAX_VOTE_OPTION) {
      setVoteOptions((prev) => prev.map((o, i) => (i === index ? value : o)))
    }
  }

  function changeVotePeriod(date: DateRange | null) {
    if (isExistingVoteLocked) return

    setVotePeriodError('')

    if (!date) {
      setVotePeriod(undefined)
      return
    }

    setVotePeriod({
      start: date.start,
      end: date.end ?? date.start,
    })
  }

  // 최종 payload 빌드 — imageUrl이 확정된 이미지만 포함
  function buildFormData(): PostFormData {
    const images = imageItems
      .filter((item) => item.imageUrl !== null)
      .map((item) => item.imageUrl!)

    const validVoteOptions = voteOptions
      .filter((option) => option.trim() !== '')
      .map((option) => option.trim())

    const hasEnteredVoteOptions = validVoteOptions.length > 0
    const hasSelectedVotePeriod = Boolean(votePeriod?.start && votePeriod?.end)
    const hasStartedVoteInput = hasEnteredVoteOptions || hasSelectedVotePeriod

    if (hasStartedVoteInput && !hasSelectedVotePeriod) {
      setVotePeriodError('투표 기간을 선택해주세요.')
      throw new Error('vote-period-required')
    }

    if (hasStartedVoteInput && validVoteOptions.length < 2) {
      setVotePeriodError('투표 옵션을 입력해주세요.')
      throw new Error('vote-options-required')
    }

    const hasActiveVote = hasSelectedVotePeriod && validVoteOptions.length >= 2

    // 기존 투표가 없고, 새 투표 입력값이 유효할 때만 vote payload 전송
    const shouldSendVote = hasActiveVote && !initialHasVote

    const toLocalDateString = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    const vote: PostFormData['vote'] = shouldSendVote
      ? {
          options: validVoteOptions,
          startDate: votePeriod?.start
            ? toLocalDateString(votePeriod.start)
            : undefined,
          endDate: votePeriod?.end
            ? toLocalDateString(votePeriod.end)
            : undefined,
        }
      : undefined

    const base: Omit<PostFormData, 'postId'> = {
      title: title.trim(),
      content: content.trim(),
      images,
      hasGoal: selectedGoalId !== undefined,
      goalId: selectedGoalId,
      hasVote: hasActiveVote,
      vote,
      canEditVote: shouldSendVote,
      tagIds: selectedTagIds,
    }

    if (mode === 'edit') {
      if (postId === undefined) {
        throw new Error('[usePostForm] edit 모드에서 postId는 필수입니다.')
      }

      return { postId, ...base }
    }

    return base
  }

  return {
    // state
    title,
    content,
    imageItems,
    selectedTagIds,
    voteOptions,
    votePeriod,
    votePeriodError,
    selectedGoalId,

    // 파생
    titleLen,
    contentLen,
    isSubmitDisabled,
    isUploading,
    canAddImage,
    isExistingVoteLocked,

    // 액션
    changeTitle,
    changeContent,
    addImages,
    resolveImages,
    removeImages,
    removeImage,
    initializeTags,
    toggleTag,
    changeVoteOption,
    changeVotePeriod,
    changeGoal: setSelectedGoalId,
    buildFormData,
  }
}
