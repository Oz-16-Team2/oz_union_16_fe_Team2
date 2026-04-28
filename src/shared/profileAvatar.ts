// 백엔드에서 내려준 프로필 캐릭터 코드를 프론트에서도 그대로 사용
// 선택 상태는 code로 관리하고, 실제 렌더링/전송에 필요한 이미지는 imageUrl로 매핑
export type ProfileAvatarCode =
  | 'avatar_1'
  | 'avatar_2'
  | 'avatar_3'
  | 'avatar_4'

export type ProfileAvatarOption = {
  code: ProfileAvatarCode
  imageUrl: string
  label: string
}

export const PROFILE_AVATAR_OPTIONS: ProfileAvatarOption[] = [
  {
    code: 'avatar_1',
    imageUrl:
      'https://jaksim-image-bucket-1.s3.ap-northeast-2.amazonaws.com/post_images/528f6967-3e29-4309-b57b-2c3ff3457794.png',
    label: '캐릭터 1',
  },
  {
    code: 'avatar_2',
    imageUrl:
      'https://jaksim-image-bucket-1.s3.ap-northeast-2.amazonaws.com/post_images/1faf9b4d-9a60-4fe2-9fe2-72e288cb4c65.png',
    label: '캐릭터 2',
  },
  {
    code: 'avatar_3',
    imageUrl:
      'https://jaksim-image-bucket-1.s3.ap-northeast-2.amazonaws.com/post_images/a169e590-203a-4ad6-a2bf-4bb05c73e4a2.png',
    label: '캐릭터 3',
  },
  {
    code: 'avatar_4',
    imageUrl:
      'https://jaksim-image-bucket-1.s3.ap-northeast-2.amazonaws.com/post_images/9b63cb03-9236-417f-99dc-9e69ce455f17.png',
    label: '캐릭터 4',
  },
]

export const DEFAULT_PROFILE_AVATAR = PROFILE_AVATAR_OPTIONS[0]

// 서버 응답이 avatar 코드일 수도 있고, 이미 완성된 URL일 수도 있어서 둘 다 처리
export const getProfileAvatarImageUrl = (value?: string | null) => {
  if (!value) return DEFAULT_PROFILE_AVATAR.imageUrl

  const matchedAvatar = PROFILE_AVATAR_OPTIONS.find(
    (avatar) => avatar.code === value
  )

  return matchedAvatar?.imageUrl ?? value
}
