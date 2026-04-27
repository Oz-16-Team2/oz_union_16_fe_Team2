type PostDetailHeaderProps = {
  author: {
    nickname: string
    profileImageUrl: string
  }
  createdAt: string
}

export function PostDetailHeader({ author, createdAt }: PostDetailHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
        <img
          src={author.profileImageUrl}
          alt={`${author.nickname}의 프로필 이미지`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-text-primary">
          {author.nickname}
        </span>
        <span className="text-xs text-text-muted">{createdAt}</span>
      </div>
    </div>
  )
}
