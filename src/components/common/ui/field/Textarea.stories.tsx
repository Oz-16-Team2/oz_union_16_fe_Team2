import { type ChangeEvent, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Common/Field/Textarea',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Textarea>

function CommentTextarea() {
  const maxLength = 500
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder="댓글로 의견을 남겨보세요"
        className="pr-17"
      />
      <span className="pointer-events-none absolute right-4.5 bottom-5 text-sm text-text-muted">
        {value.length}/{maxLength}
      </span>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div className="flex w-[800px] flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">댓글</h3>
        <CommentTextarea />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">내용</h3>
        <Textarea size="lg" placeholder="내용을 입력해 주세요." />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">신고사유</h3>
        <Textarea placeholder="신고 사유를 입력해 주세요." />
      </section>
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="flex w-[800px] flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">
          게시글 내용 에러
        </h3>
        <Textarea
          error
          size="lg"
          errorMessage="게시글 내용을 입력해 주세요."
          placeholder="게시글 내용을 입력해 주세요."
        />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-text-primary">
          신고사유 에러
        </h3>
        <Textarea
          error
          errorMessage="신고 사유를 입력해 주세요."
          placeholder="신고 사유를 입력해 주세요."
        />
      </section>
    </div>
  ),
}
