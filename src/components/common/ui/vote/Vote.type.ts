import type { ReactNode } from 'react'

import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

// 조회 모드 (enum 대신 const object 사용)
export const VoteViewerMode = {
  GUEST: 'guest',
  MEMBER: 'member',
  VOTED: 'voted',
  CLOSED: 'closed',
} as const

export type VoteViewerMode =
  (typeof VoteViewerMode)[keyof typeof VoteViewerMode]

// 생성/수정 모드
export const VoteEditorMode = {
  CREATE: 'create',
  EDIT: 'edit',
} as const

export type VoteEditorMode =
  (typeof VoteEditorMode)[keyof typeof VoteEditorMode]

// 옵션 데이터
export type VoteDisplayOption = {
  id: string
  optionLabel: string
  valueLabel: string
  percentage?: number
  checked?: boolean
}

// 공통 필드
type VoteBaseProps = {
  period?: DateRange
  participantCount?: number
}

// 조회 컴포넌트 props
export type VoteDisplayProps = {
  mode: VoteViewerMode
  options: VoteDisplayOption[]
  actionLabel?: string
  showMoreButton?: boolean
  actionSlot?: ReactNode
  onSelectOption?: (optionId: string) => void
  onActionClick?: () => void
  showCalendarIcon?: boolean
} & VoteBaseProps

// 생성/수정 컴포넌트 props
export type VoteEditorProps = {
  mode: VoteEditorMode
  options: string[]
  disabled?: boolean
  hideOptionLength?: boolean
  hideParticipantCount?: boolean
  onChangeOption?: (index: number, value: string) => void
  onSubmit?: () => void
  onChangePeriod?: (date: DateRange | null) => void
} & VoteBaseProps
