import type { Meta, StoryObj } from '@storybook/react-vite'

import { ActionMenu } from './ActionMenu'

const meta: Meta<typeof ActionMenu> = {
  component: ActionMenu,
  title: 'Common/ActionMenu',
  parameters: { layout: 'centered' },
  argTypes: {
    align: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
}
export default meta

type Story = StoryObj<typeof ActionMenu>

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="2" r="1.5" fill="#555" />
    <circle cx="8" cy="8" r="1.5" fill="#555" />
    <circle cx="8" cy="14" r="1.5" fill="#555" />
  </svg>
)

export const MyPage: Story = {
  args: {
    trigger: <DotsIcon />,
    align: 'right',
    items: [
      { label: '마이페이지', onClick: () => {} },
      { label: '프로필 수정', onClick: () => {} },
      { label: '로그아웃', onClick: () => {} },
      { label: '회원탈퇴', onClick: () => {} },
    ],
  },
}

export const PostActions: Story = {
  args: {
    trigger: <DotsIcon />,
    align: 'right',
    items: [
      { label: '수정', onClick: () => {} },
      { label: '삭제', onClick: () => {} },
      { label: '신고', onClick: () => {} },
    ],
  },
}
