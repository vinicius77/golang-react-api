import { MessageType } from "@/components/commons/Toast/Toast"
import { createContext } from "react"

export type MessageOpts = {
  message: string
  type: MessageType
  delay?: number
}

type ToastContextValue = {
  open: (message: MessageOpts) => void
  close: (id: number) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
