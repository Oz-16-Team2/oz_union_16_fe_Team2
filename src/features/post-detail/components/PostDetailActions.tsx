import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'

export function PostDetailActions() {
  return (
    <div className="mb-6 flex items-center gap-4 border-b border-border-subtle pb-4 text-text-muted">
      <div className="flex items-center gap-1">
        <Heart size={16} />
        <span>0</span>
      </div>

      <div className="flex items-center gap-1">
        <MessageCircle size={16} />
        <span>0</span>
      </div>

      <Share2 size={16} />
      <Bookmark size={16} />
    </div>
  )
}
