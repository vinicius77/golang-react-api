import useTimeout from "@/hooks/useTimeout"
import "./Toast.css"

export type MessageType = "error" | "success"

type ToastProps = {
  message: string
  type: MessageType
  close: () => void
  delay?: number
}

const Toast = (props: ToastProps) => {
  const { message, type, close, delay } = props
  useTimeout(() => close(), delay)

  return (
    <div className={`toast toast-${type}`}>
      <p>{message}</p>
      <button className="toast-close-btn" onClick={close}>
        <span>{"\u274C"}</span>
      </button>
    </div>
  )
}

export default Toast
