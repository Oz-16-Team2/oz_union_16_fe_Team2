export const EMPTY_STATE_MESSAGES = {
  post: {
    title: '게시물이 없습니다.',
    description: '첫 게시물을 등록해 보세요.',
  },
  comment: {
    title: '아직 댓글이 없어요.',
    description: '첫 댓글을 남겨보세요.',
  },
  goal: {
    empty: {
      title: '등록된 목표가 없어요.',
      description: '목표를 생성해서 시작해보세요.',
    },
    filtered: {
      title: '조건에 맞는 목표가 없어요.',
      description: '다른 필터나 기간으로 다시 확인해보세요.',
    },
  },
} as const
