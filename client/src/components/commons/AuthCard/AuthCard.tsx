import React from "react"

import AuthCardFooter from "@/components/commons/AuthCard/AuthCardFooter"

import "./AuthCard.css"

export type AuthMode = "Login" | "Register"
export type ProviderOpts = "Google" | "Github"

interface AuthCardProps {
  title: AuthMode
  children: React.ReactElement
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>

        {children}

        <div className="auth-toggle">
          <AuthCardFooter mode={title} />
        </div>
      </div>
    </div>
  )
}

export default AuthCard
