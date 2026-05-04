import { useEffect, useRef } from 'react'

import { WifiOff } from 'lucide-react'

import { useToast } from '@/components/common/ui/toast/useToast'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'

export function NetworkStatusBanner() {
  const isOnline = useNetworkStatus()
  const wasOnlineRef = useRef(isOnline)
  const toast = useToast()

  useEffect(() => {
    if (wasOnlineRef.current && !isOnline) {
      toast.error('인터넷 연결이 끊겼어요.')
    }

    if (!wasOnlineRef.current && isOnline) {
      toast.success('인터넷이 다시 연결됐어요.')
    }

    wasOnlineRef.current = isOnline
  }, [isOnline, toast])

  if (isOnline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-3"
    >
      <div className="flex items-center gap-2 rounded-full border border-orange-400 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-500 shadow-card-main dark:border-orange-300 dark:bg-orange-950 dark:text-orange-200">
        <WifiOff className="size-4 shrink-0" aria-hidden="true" />
        <span>인터넷 연결이 끊겼어요. 변경사항이 저장되지 않을 수 있어요.</span>
      </div>
    </div>
  )
}
