import type {
  ApiGoalResponse,
  ApiPostResponse,
  ApiTagResponse,
} from '@/features/post/post.api.types'

export const mockGoals: ApiGoalResponse[] = [
  {
    goal_id: 101,
    title: '매일 1시간 운동',
    startDate: '2026-04-08',
    endDate: '2026-05-08',
    status: 'IN_PROGRESS',
    created_at: '2026-04-08T19:00:00',
    progressRate: 48,
    isCheckedToday: true,
  },
  {
    goal_id: 102,
    title: '하루 30분 독서',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    status: 'IN_PROGRESS',
    created_at: '2026-04-01T09:00:00',
    progressRate: 65,
    isCheckedToday: false,
  },
  {
    goal_id: 103,
    title: '주 3회 영어 공부',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    status: 'COMPLETED',
    created_at: '2026-03-01T08:00:00',
    progressRate: 100,
    isCheckedToday: false,
  },
]

export const mockTags: ApiTagResponse[] = [
  { id: 1, name: '운동' },
  { id: 2, name: '독서' },
  { id: 3, name: '공부' },
  { id: 4, name: '식단' },
  { id: 5, name: '명상' },
]

export const mockPost: ApiPostResponse = {
  post_id: 305,
  images: [],
  profile_image_url: null,
  nickname: '테스트유저',
  created_at: '2026-04-20T10:00:00',
  title: '오늘의 운동 기록',
  content: '오늘도 열심히 운동했습니다. 1시간 동안 러닝과 스트레칭을 했어요.',
  tags: ['운동'],
  like_count: 5,
  comment_count: 3,
  is_scrapped: false,
  has_goal: true,
  goal_info: {
    goal_id: 101,
    goal_title: '매일 1시간 운동',
    goal_start_date: '2026-04-08',
    goal_end_date: '2026-05-08',
    goal_progress: 48,
  },
  has_vote: true,
  vote_info: {
    vote_id: 10,
    start_at: '2026-04-20T00:00:00',
    end_at: '2026-04-27T23:59:59',
    status: 'in_progress',
    options: [
      { option_id: 1, content: '아침 운동이 좋다', sort_order: 1 },
      { option_id: 2, content: '저녁 운동이 좋다', sort_order: 2 },
    ],
  },
}
