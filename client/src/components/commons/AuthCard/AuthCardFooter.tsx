import { Link } from "react-router-dom"
import { AuthMode } from "./AuthCard"

type AuthCardFooterProps = {
  mode: AuthMode
}

const AuthCardFooter = ({ mode }: AuthCardFooterProps) => {
  if (mode === "login") {
    return (
      <>
        Don't have an account?{" "}
        <Link to="/register" className="auth-toggle-link">
          Register
        </Link>
      </>
    )
  }

  return (
    <>
      Already have an account?{" "}
      <Link to="/login" className="auth-toggle-link">
        Sign in
      </Link>
    </>
  )
}

export default AuthCardFooter
