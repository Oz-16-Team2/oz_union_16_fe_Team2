import { MoreHorizontal } from 'lucide-react'

import { ActionMenu } from '@/components/common/overlay/dropdown/action-menu/ActionMenu'
import { VoteDisplay } from '@/components/common/ui/vote/VoteDisplay'
import { VoteEditor } from '@/components/common/ui/vote/VoteEditor'
import type { PostDetailData } from '@/features/post/post.types'
import { usePostDetailVoteSection } from '@/features/post-detail/hooks/usePostDetailVoteSection'
import {
  getVoteMode,
  toVoteDisplayOptions,
} from '@/features/post-detail/utils/voteDisplayMapper'

type PostDetailVoteSectionProps = {
  post: PostDetailData
}

export function PostDetailVoteSection({ post }: PostDetailVoteSectionProps) {
  const {
    voteDetail,
    participantCount,
    selectedOptionId,
    isEditMode,
    editOptions,
    editPeriod,
    handleVoteSubmit,
    handleVoteOptionSelect,
    handleEdit,
    handleDelete,
    handleChangeEditOption,
    handleChangeEditPeriod,
    handleUpdateVote,
    handleCancelEdit,
  } = usePostDetailVoteSection(post)

  if (!post.hasVote || !post.voteInfo) return null

  if (isEditMode) {
    return (
      <div className="mt-6 w-full min-w-0">
        <div className="w-full min-w-0 rounded-2xl border border-border-default bg-surface p-4">
          <VoteEditor
            mode="edit"
            options={editOptions}
            period={editPeriod}
            onChangeOption={handleChangeEditOption}
            onChangePeriod={handleChangeEditPeriod}
            onSubmit={handleUpdateVote}
            actionSlot={
              <button
                type="button"
                className="text-sm text-text-muted"
                onClick={handleCancelEdit}
              >
                취소
              </button>
            }
          />
        </div>
      </div>
    )
  }
  return (
    <div className="mt-6 w-full min-w-0">
      <div className="w-full min-w-0 rounded-2xl border border-border-default bg-surface p-4">
        <VoteDisplay
          mode={getVoteMode(post.voteInfo, voteDetail?.is_voted)}
          options={toVoteDisplayOptions(voteDetail, selectedOptionId)}
          participantCount={participantCount}
          period={{
            start: new Date(post.voteInfo.startAt),
            end: new Date(post.voteInfo.endAt),
          }}
          onSelectOption={handleVoteOptionSelect}
          onActionClick={handleVoteSubmit}
          actionSlot={
            post.isOwner ? (
              <ActionMenu
                trigger={
                  <MoreHorizontal size={20} className="text-text-primary" />
                }
                items={[
                  { label: '수정', onClick: handleEdit },
                  { label: '삭제', onClick: handleDelete, variant: 'danger' },
                ]}
                align="right"
                size="sm"
              />
            ) : undefined
          }
        />
      </div>
    </div>
  )
}
