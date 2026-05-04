import { PostListSection } from '@/features/main/post-list'
import { RankingSection } from '@/features/main/ranking'

export function MainPage() {
  return (
    <main className="flex w-full max-w-7xl flex-1 flex-col gap-6 mx-auto">
      <RankingSection />
      <PostListSection />
    </main>
  )
}
