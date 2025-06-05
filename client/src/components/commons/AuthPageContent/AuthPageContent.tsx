import { Fragment, useContext } from "react"

import AuthCard, {
  AuthMode,
  ProviderOpts,
} from "@/components/commons/AuthCard/AuthCard"
import AuthCardButton from "@/components/commons/AuthCard/AuthCardButton.tsx"
import { AuthContext } from "@/contexts/auth-context"

import { signInWithProvider } from "@/utils/auth"
import { useToast } from "@/hooks/useToast"

type AuthPageContentProps = {
  mode: AuthMode
}

const AuthPageContent = ({ mode }: AuthPageContentProps) => {
  const toast = useToast()
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider")
  }
  const { dispatch } = authContext

  const onHandleRegister = async (provider: ProviderOpts) => {
    const { result, error } = await signInWithProvider(provider)
    const message =
      error instanceof Error ? error?.message : "error registering"

    if (result) {
      const idToken = await result.user.getIdToken()
      try {
        await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // important to include cookies
          body: JSON.stringify({ idToken }),
        })
        dispatch({ type: "LOGIN", payload: result.user })
        toast?.open({
          message: "success registering",
          type: "success",
          delay: 4000,
        })
        return
      } catch (error) {
        toast?.open({ message, type: "error", delay: 4000 })
      }
    }
    toast?.open({ message, type: "error", delay: 4000 })
  }

  return (
    <section>
      <AuthCard title={mode}>
        <Fragment>
          <AuthCardButton
            action={mode}
            provider="Google"
            onClick={onHandleRegister}
          />
          <AuthCardButton
            action={mode}
            provider="Github"
            onClick={onHandleRegister}
          />
        </Fragment>
      </AuthCard>
    </section>
  )
}

export default AuthPageContent
