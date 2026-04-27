import { yellowCharacterImage } from '@/assets/images'
import { VoteViewerMode } from '@/components/common/ui/vote/Vote.type'

export const mockPostDetail = {
  author: {
    nickname: '하이룽',
    profileImageUrl: yellowCharacterImage,
  },
  createdAt: '2026.04.01',
  title: '운동 vs 공부 뭐부터 할까?',
  content: '내용입니다',
  tags: ['운동', '개발'],
  images: [
    'https://picsum.photos/300',
    'https://picsum.photos/301',
    'https://picsum.photos/302',
  ],
}
export const mockVote = {
  mode: VoteViewerMode.MEMBER,
  period: {
    start: new Date('2026-04-01'),
    end: new Date('2026-04-07'),
  },
  options: [
    {
      id: '1',
      optionLabel: '운동 먼저',
      valueLabel: '10명',
      percentage: 60,
      checked: false,
    },
    {
      id: '2',
      optionLabel: '공부 먼저',
      valueLabel: '7명',
      percentage: 40,
      checked: false,
    },
  ],
  participantCount: 17,
}

export const mockGoal = {
  title: '운동하기',
  startDate: '2026.04.01',
  endDate: '2026.08.09',
  progressRate: 70,
  status: 'IN_PROGRESS',
} as const
