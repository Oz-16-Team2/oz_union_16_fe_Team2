import type { Meta, StoryObj } from '@storybook/react-vite'

import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <div className="flex w-112.5 flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">닉네임</h3>
        <Input
          placeholder="닉네임 입력 해주세요"
          className="rounded-none border-x-0 border-t-0 border-b-gray-950 px-0 pb-2"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">목표</h3>
        <Input
          placeholder="목표를 입력해주세요"
          className="rounded-md px-3 py-2.5 text-sm"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">검색</h3>
        <Input
          placeholder="검색어를 입력하세요"
          className="rounded-full shadow-input"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">게시글 제목</h3>
        <Input placeholder="게시글 제목을 입력해주세요" />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">투표 항목</h3>
        <Input
          placeholder="투표 항목을 입력해주세요"
          className="rounded-full border-transparent px-5 py-4.5 text-sm shadow-[0_1px_1px_0_rgba(0,0,0,0.1)]"
        />
      </section>
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="flex w-112.5 flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">닉네임 에러</h3>
        <Input
          error
          errorMessage="중복된 닉네임입니다."
          placeholder="닉네임 입력 해주세요"
          className="rounded-none border-x-0 border-t-0 border-b-gray-950 px-0 pb-2 text-text-primary"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">목표 에러</h3>
        <Input
          error
          placeholder="목표를 입력해주세요"
          className="rounded-md px-3 py-2.5 text-sm placeholder:text-status-error-text"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">
          게시글 제목 에러
        </h3>
        <Input
          error
          placeholder="게시글 제목을 입력해주세요"
          className="placeholder:text-status-error-text"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">
          투표 항목 에러
        </h3>
        <Input
          error
          placeholder="투표 항목을 입력해주세요"
          className="rounded-full border-transparent px-5 py-4.5 text-sm shadow-[0_1px_1px_0_rgba(0,0,0,0.1)] placeholder:text-status-error-text"
        />
      </section>
    </div>
  ),
}
