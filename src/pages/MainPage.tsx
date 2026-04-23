import { PostListSection } from '@/features/main/post-list'
import { RankingSection } from '@/features/main/ranking'

export function MainPage() {
  return (
    <main className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <RankingSection />
      <PostListSection />
    </main>
  )
}
