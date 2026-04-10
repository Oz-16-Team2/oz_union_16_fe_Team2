import { logoImage } from '@/assets/images'

export default function Header() {
  return (
    <header className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between py-3 px-4">
        <img src={logoImage} className="w-12" alt="OZ Union 로고" />
        <div>
          {/* TODO: 레이아웃 확정 후 로그인 상태와 공통 버튼 컴포넌트에 맞춰 헤더 props 분리 */}
          <button className="text-lg">로그인</button>
        </div>
      </div>
    </header>
  )
}
