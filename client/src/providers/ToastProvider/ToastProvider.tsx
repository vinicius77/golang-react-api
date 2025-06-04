import { useMemo, useState } from "react"

import Toast, { MessageType } from "@/components/commons/Toast/Toast"
import { MessageOpts, ToastContext } from "@/contexts/toast-context"

import "./ToastProvider.css"

type ToastType = {
  message: string
  id: number
  type: MessageType
  delay?: number
}

type ToastProviderProps = {
  children: React.ReactElement
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([])

  function onOpenToast({ message, type, delay }: MessageOpts) {
    const newToast = {
      id: Date.now(),
      message,
      type,
      delay,
    }
    setToasts((prevToasts) => [newToast, ...prevToasts])
  }

  function onCloseToast(id: number) {
    const updatedToasts = toasts.filter((toast) => toast.id !== id)
    setToasts(updatedToasts)
  }

  const contextValue = useMemo(
    () => ({
      open: onOpenToast,
      close: onCloseToast,
    }),
    []
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toasts">
        {toasts.length
          ? toasts.map((toast) => (
              <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                delay={toast.delay}
                close={() => onCloseToast(toast.id)}
              />
            ))
          : null}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
