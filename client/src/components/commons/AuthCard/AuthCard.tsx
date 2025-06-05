import React from "react"

import AuthCardFooter from "@/components/commons/AuthCard/AuthCardFooter"

import "./AuthCard.css"

export type AuthMode = "login" | "register"
export type ProviderOpts = "Google" | "Github"

interface AuthCardProps {
  mode: AuthMode
  children: React.ReactElement
}

const AuthCard: React.FC<AuthCardProps> = ({ mode, children }) => {
  const isLogin = mode === "login"
  const title = isLogin ? "Login" : "Register"

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>

        {children}

        <div className="auth-toggle">
          <AuthCardFooter mode={mode} />
        </div>
      </div>
    </div>
  )
}

export default AuthCard
