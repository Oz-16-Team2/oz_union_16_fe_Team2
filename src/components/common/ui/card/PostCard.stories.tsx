import type { Meta, StoryObj } from '@storybook/react-vite'

import { PostCard } from './PostCard'

const meta: Meta<typeof PostCard> = {
  component: PostCard,
  title: 'Common/PostCard',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof PostCard>

const baseProps = {
  postId: 1,
  images: [] as string[],
  profileImageUrl: 'https://picsum.photos/28/28?random=1',
  nickname: '작심며칠',
  createdAt: '2026-04-27 14:00:00',
  title: '운동 vs 공부 뭐부터 할까? 진짜 너무 고민된다 아무것도 못하겠어',
  contentPreview:
    '오늘부터 마음 다시 잡으려고 합니다 운동이랑 공부 중에 뭐부터 시작하면 좋을까요. 사실 둘 다 하고 싶긴 한데 체력이 딸려서 고민이에요. 여러분은 어떻게 하시나요?',
  tags: ['공부', '운동'],
  likeCount: 10,
  commentCount: 3,
  isLiked: false,
  isScrapped: false,
  isOwner: false,
}

export const WithImage: Story = {
  render: () => (
    <PostCard
      {...baseProps}
      images={['https://picsum.photos/276/128?random=10']}
    />
  ),
}

export const WithoutImage: Story = {
  render: () => <PostCard {...baseProps} />,
}

export const Liked: Story = {
  render: () => <PostCard {...baseProps} isLiked />,
}

export const Bookmarked: Story = {
  render: () => <PostCard {...baseProps} isScrapped />,
}

export const Owner: Story = {
  render: () => (
    <PostCard
      {...baseProps}
      images={['https://picsum.photos/276/128?random=10']}
      isOwner
    />
  ),
}

export const DarkWithImage: Story = {
  render: () => (
    <div className="dark bg-surface p-6 rounded-lg">
      <PostCard
        {...baseProps}
        images={['https://picsum.photos/276/128?random=10']}
      />
    </div>
  ),
}

export const DarkWithoutImage: Story = {
  render: () => (
    <div className="dark bg-surface p-6 rounded-lg">
      <PostCard {...baseProps} />
    </div>
  ),
}
