import type { Meta, StoryObj } from '@storybook/react-vite'

import { GoalCard } from './GoalCard'
import { GoalCardEdit } from './GoalCardEdit'

const goalCardMeta: Meta<typeof GoalCard> = {
  component: GoalCard,
  title: 'Common/GoalCard',
  parameters: { layout: 'centered' },
}
export default goalCardMeta

type GoalCardStory = StoryObj<typeof GoalCard>
type GoalCardEditStory = StoryObj<typeof GoalCardEdit>

export const Default: GoalCardStory = {
  render: () => (
    <GoalCard
      title="운동하기"
      status="진행중"
      startDate="2026.04.01"
      endDate="2026.08.09"
      onDelete={() => alert('삭제')}
    />
  ),
}

export const TitleOverflow: GoalCardStory = {
  render: () => (
    <GoalCard
      title="운동하기ddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
      status="진행중"
      startDate="2026.04.01"
      endDate="2026.08.09"
      onDelete={() => alert('삭제')}
    />
  ),
}

export const Completed: GoalCardStory = {
  render: () => (
    <GoalCard
      title="운동하기"
      status="완료"
      startDate="2026.04.01"
      endDate="2026.08.09"
      onDelete={() => alert('삭제')}
    />
  ),
}

export const NotAchieved: GoalCardStory = {
  render: () => (
    <GoalCard
      title="운동하기"
      status="미달성"
      startDate="2026.04.01"
      endDate="2026.08.09"
      onDelete={() => alert('삭제')}
    />
  ),
}

export const DarkDefault: GoalCardStory = {
  render: () => (
    <div className="dark bg-surface p-6 rounded-lg">
      <GoalCard
        title="운동하기"
        status="진행중"
        startDate="2026.04.01"
        endDate="2026.08.09"
        onDelete={() => alert('삭제')}
      />
    </div>
  ),
}

export const Create: GoalCardEditStory = {
  render: () => (
    <GoalCardEdit
      mode="create"
      onClose={() => alert('닫기')}
      onSubmit={(data) => alert(JSON.stringify(data))}
    />
  ),
}

export const Edit: GoalCardEditStory = {
  render: () => (
    <GoalCardEdit
      mode="edit"
      initialTitle="운동하기"
      onClose={() => alert('닫기')}
      onSubmit={(data) => alert(JSON.stringify(data))}
    />
  ),
}

export const DarkCreate: GoalCardEditStory = {
  render: () => (
    <div className="dark bg-surface p-6 rounded-lg">
      <GoalCardEdit
        mode="create"
        onClose={() => alert('닫기')}
        onSubmit={(data) => alert(JSON.stringify(data))}
      />
    </div>
  ),
}
