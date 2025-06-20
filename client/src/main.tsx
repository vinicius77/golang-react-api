import React from "react"
import ReactDOM from "react-dom/client"

import App from "@/App.tsx"
import AuthContextProvider from "@/contexts/auth-context"
import ToastProvider from "@/providers/ToastProvider"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
