import { createElement } from 'react'

import { toast } from 'sonner'

import { Toast } from './Toast'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastProps = {
  message: string
  type?: ToastType
}

const showCustomToast = (type: ToastType, message: string) => {
  return toast.custom(() => createElement(Toast, { type, message }))
}

export const useToast = () => {
  return {
    success: (message: string) => showCustomToast('success', message),
    error: (message: string) => showCustomToast('error', message),
    warning: (message: string) => showCustomToast('warning', message),
    info: (message: string) => showCustomToast('info', message),
  }
}
