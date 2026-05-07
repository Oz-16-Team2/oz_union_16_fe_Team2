import { useEffect, useState } from 'react'

import { ArrowUp } from 'lucide-react'

const SCROLL_VISIBLE_THRESHOLD = 240

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_VISIBLE_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="맨 위로 이동"
      className="fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full border border-border-default bg-white text-text-primary shadow-card-hover transition hover:-translate-y-0.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-focus-border focus:ring-offset-2 active:translate-y-0 dark:bg-gray-900 dark:hover:bg-gray-800 sm:bottom-8 sm:right-8"
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  )
}
