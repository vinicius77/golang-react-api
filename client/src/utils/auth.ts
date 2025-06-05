import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from "firebase/auth"

import { auth } from "@/utils/firebase"
import { ProviderOpts } from "@/components/commons/AuthCard/AuthCard"

interface SignInResult {
  result: UserCredential | null
  error: Error | null
}

export const signInWithProvider = async (
  provider: ProviderOpts
): Promise<SignInResult> => {
  const providerInstance =
    provider === "Google" ? new GoogleAuthProvider() : new GithubAuthProvider()

  try {
    const result = await signInWithPopup(auth, providerInstance)
    return { result, error: null }
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error")
    return { result: null, error }
  }
}
