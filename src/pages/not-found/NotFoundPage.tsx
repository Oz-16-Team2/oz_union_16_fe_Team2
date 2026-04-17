import { useNavigate } from 'react-router'

import NotFoundImage from '@/assets/images/404.png'
import { Button } from '@/components/common/ui'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
      <img src={NotFoundImage} alt="404" className="w-32 md:w-40 h-auto" />

      <h2 className="mt-6 text-2xl font-semibold">페이지를 찾을 수 없어요</h2>

      <p className="mt-3 text-sm text-text-muted">
        요청하신 페이지가 없거나 이동되었어요.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button variant="primary" onClick={() => navigate('/')}>
          홈으로 가기
        </Button>
        <Button variant="primary" onClick={() => navigate(-1)}>
          이전 페이지
        </Button>
      </div>
    </div>
  )
}
