import Google from "@/icons/google.svg?react"
import Github from "@/icons/github.svg?react"
import { ProviderOpts } from "./AuthCard"

type AuthCardButtonProps = {
  onClick: (provider: ProviderOpts) => void
  action: "Register" | "Login"
  provider: ProviderOpts
}

const AuthCardButton = ({ onClick, action, provider }: AuthCardButtonProps) => {
  const icon = provider === "Github" ? <Github /> : <Google />

  return (
    <div className="auth-buttons">
      <button className="auth-button" onClick={() => onClick(provider)}>
        <span className="auth-icon">{icon}</span>
        {action} with {provider}
      </button>
    </div>
  )
}

export default AuthCardButton
