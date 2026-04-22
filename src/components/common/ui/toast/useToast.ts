import { createElement } from 'react'

import { type ExternalToast, toast } from 'sonner'

import { Toast } from './Toast'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastProps = {
  message: string
  type?: ToastType
}

const showCustomToast = (
  type: ToastType,
  message: string,
  options?: ExternalToast
) => {
  return toast.custom(() => createElement(Toast, { type, message }), options)
}

export const useToast = () => {
  return {
    success: (message: string, options?: ExternalToast) =>
      showCustomToast('success', message, options),
    error: (message: string, options?: ExternalToast) =>
      showCustomToast('error', message, options),
    warning: (message: string, options?: ExternalToast) =>
      showCustomToast('warning', message, options),
    info: (message: string, options?: ExternalToast) =>
      showCustomToast('info', message, options),
  }
}
