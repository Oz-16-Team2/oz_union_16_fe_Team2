type PostDetailHeaderProps = {
  author: {
    nickname: string
    profileImageUrl?: string | null
  }
  createdAt: string
}

export function PostDetailHeader({ author, createdAt }: PostDetailHeaderProps) {
  return (
    <div className="mt-9 flex items-center gap-3">
      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
        {author.profileImageUrl ? (
          <img
            src={author.profileImageUrl}
            alt={`${author.nickname}의 프로필 이미지`}
            className="h-full w-full object-cover"
          />
        ) : null}
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
