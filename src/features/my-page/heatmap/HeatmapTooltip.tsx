import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

export type HeatmapTooltipHandle = {
  hide: () => void
  show: (payload: {
    date: string
    checkCount: number
    top: number
    left: number
    shouldFlip: boolean
  }) => void
}

export const HeatmapTooltip = forwardRef<HeatmapTooltipHandle>(
  function HeatmapTooltip(_props, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLSpanElement | null>(null)
    const arrowRef = useRef<HTMLDivElement | null>(null)

    useImperativeHandle(ref, () => ({
      show: ({ date, checkCount, top, left, shouldFlip }) => {
        const container = containerRef.current
        const content = contentRef.current
        const arrow = arrowRef.current

        if (!container || !content || !arrow) return

        container.style.display = 'flex'
        container.style.top = `${top}px`
        container.style.left = `${left}px`
        container.classList.toggle('-translate-x-full', shouldFlip)

        content.textContent = `${date} 완료 ${checkCount}회`

        arrow.classList.toggle('-right-1', shouldFlip)
        arrow.classList.toggle('-left-1', !shouldFlip)
      },
      hide: () => {
        const container = containerRef.current
        if (!container) return
        container.style.display = 'none'
      },
    }))

    if (typeof document === 'undefined') return null

    return createPortal(
      <div
        ref={containerRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden -translate-y-1/2 items-center text-[11px]"
        role="tooltip"
      >
        <div className="relative rounded-md bg-black/85 px-2 py-1 whitespace-nowrap text-white shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
          <span ref={contentRef} />
          <div
            ref={arrowRef}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-black/85"
            aria-hidden="true"
          />
        </div>
      </div>,
      document.body
    )
  }
)
