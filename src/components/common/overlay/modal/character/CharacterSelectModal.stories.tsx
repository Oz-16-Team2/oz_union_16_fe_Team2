import type { Meta, StoryObj } from '@storybook/react-vite'

import blueCharacterImage from '@/assets/images/blue_character.png'
import orangeCharacterImage from '@/assets/images/orange_character.png'
import pinkCharacterImage from '@/assets/images/pink_character.png'
import yellowCharacterImage from '@/assets/images/yellow_character.png'
import { useModal } from '@/hooks/useModal'
import type { ProfileAvatarOption } from '@/shared/profileAvatar'

import { CharacterSelectModal } from './CharacterSelectModal'

const profileAvatarOptions: ProfileAvatarOption[] = [
  {
    code: 'avatar_01',
    imageUrl: pinkCharacterImage,
    label: '캐릭터 1',
  },
  {
    code: 'avatar_02',
    imageUrl: yellowCharacterImage,
    label: '캐릭터 2',
  },
  {
    code: 'avatar_03',
    imageUrl: blueCharacterImage,
    label: '캐릭터 3',
  },
  {
    code: 'avatar_04',
    imageUrl: orangeCharacterImage,
    label: '캐릭터 4',
  },
]

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
            onSelect={(code) => {
              alert(`선택된 캐릭터: ${code}`)
              close()
            }}
            onClose={close}
          />
        )}
      </>
    )
  },
  args: {
    characters: profileAvatarOptions,
    onSelect: () => {},
    onClose: () => {},
  },
}

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: (args) => <CharacterSelectModal {...args} />,
  args: {
    characters: profileAvatarOptions,
    onSelect: () => {},
    onClose: () => {},
  },
}
