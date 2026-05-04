export type ProfileAvatarCode = string

export type ProfileAvatarOption = {
  code: ProfileAvatarCode
  imageUrl: string
  label: string
}

type ProfileAvatarApiItem = {
  code: string
  image_url: string
}

export const toProfileAvatarOptions = (
  profileImages: ProfileAvatarApiItem[]
): ProfileAvatarOption[] =>
  profileImages.map((profileImage, index) => ({
    code: profileImage.code,
    imageUrl: profileImage.image_url,
    label: `캐릭터 ${index + 1}`,
  }))

// 서버 응답이 avatar 코드일 수도 있고, 이미 완성된 URL일 수도 있어서 둘 다 처리합니다.
export const getProfileAvatarImageUrl = (
  value?: string | null,
  options: ProfileAvatarOption[] = []
) => {
  if (!value) return options[0]?.imageUrl ?? ''

  const matchedAvatar = options.find((avatar) => avatar.code === value)

  return matchedAvatar?.imageUrl ?? value
}
