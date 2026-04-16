import type { ReactNode } from 'react'

export type VoteViewerMode = 'guest' | 'member' | 'voted' | 'closed'
export type VoteEditorMode = 'create' | 'edit'

export type VoteDisplayOption = {
  id: string
  optionLabel: string
  valueLabel: string
  percentage?: number
  checked?: boolean
}

export type VoteDisplayProps = {
  mode: VoteViewerMode
  options: VoteDisplayOption[]
  participantCount?: number
  startDate?: string
  endDate?: string
  actionLabel?: string
  showMoreButton?: boolean
  actionSlot?: ReactNode
  onSelectOption?: (optionId: string) => void
  onActionClick?: () => void
}

export type VoteEditorProps = {
  mode: VoteEditorMode
  startDate?: string
  endDate?: string
  options: string[]
  participantCount?: number
  disabled?: boolean
  onChangeOption?: (index: number, value: string) => void
  onSubmit?: () => void
  onClickPeriod?: () => void
}
