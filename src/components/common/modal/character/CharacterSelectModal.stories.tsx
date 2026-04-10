import type { Meta, StoryObj } from '@storybook/react-vite'

import { useModal } from '@/hooks/useModal'

import { CharacterSelectModal } from './CharacterSelectModal'

const meta: Meta<typeof CharacterSelectModal> = {
  component: CharacterSelectModal,
  title: 'Common/Modal/CharacterSelectModal',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof CharacterSelectModal>

export const Default: Story = {
  render: (args) => {
    const { isOpen, open, close } = useModal()
    return (
      <>
        <button
          type="button"
          onClick={open}
          className="rounded-lg bg-primary-500 px-5 py-2 text-white cursor-pointer"
        >
          모달 열기
        </button>
        {isOpen && (
          <CharacterSelectModal
            {...args}
            onSelect={(id) => {
              alert(`선택된 캐릭터: ${id}`)
              close()
            }}
            onClose={close}
          />
        )}
      </>
    )
  },
  args: {
    onSelect: () => {},
    onClose: () => {},
  },
}
