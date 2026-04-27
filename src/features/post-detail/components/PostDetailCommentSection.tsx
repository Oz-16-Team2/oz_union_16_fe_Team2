import { useState } from 'react'

import {
  type Comment,
  CommentInput,
  CommentList,
} from '@/components/common/ui/comment'

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    user_id: 2,
    nickname: '하이룽',
    content: '치맥이나 하자 ㅋㅋㅋㅋ',
    created_at: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    like_count: 0,
    is_liked: false,
    profile_image_url: null,
  },
  {
    id: 2,
    user_id: 3,
    nickname: 'stt',
    content: 'ㅋㅋㅋㅋ',
    created_at: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    like_count: 0,
    is_liked: false,
    profile_image_url: null,
  },
]

const CURRENT_USER_ID = 1

export function PostDetailCommentSection() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS)

  const handleSubmitComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      user_id: CURRENT_USER_ID,
      nickname: '나',
      content,
      created_at: new Date().toISOString(),
      like_count: 0,
      is_liked: false,
      profile_image_url: null,
    }

    setComments((prevComments) => [newComment, ...prevComments])
  }

  const handleLike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              is_liked: !comment.is_liked,
              like_count: comment.is_liked
                ? comment.like_count - 1
                : comment.like_count + 1,
            }
          : comment
      )
    )
  }

  return (
    <section>
      <div className="px-6"></div>
      <CommentInput onSubmit={handleSubmitComment} />

      <div className="mt-8">
        <CommentList
          comments={comments}
          currentUserId={CURRENT_USER_ID}
          onLike={handleLike}
        />
      </div>
    </section>
  )
}
