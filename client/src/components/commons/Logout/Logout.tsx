import { useContext } from "react"
import useLogout from "@/hooks/useLogout"

import SignOut from "@/icons/sign-out.svg?react"
import DropdownItem from "@/components/commons/TopNavBar/DropdownItem"
import { AuthContext } from "@/contexts/auth-context"

const Logout = () => {
  const authContext = useContext(AuthContext)
  const { logout } = useLogout()

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider")
  }
  const { dispatch } = authContext

  const onLogout = async () => {
    await logout()
    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include", // Include cookie for backend to clear it
    })
    dispatch({ type: "LOGOUT", payload: null })
  }

  return (
    <DropdownItem leftIcon={<SignOut />} onClick={onLogout} goToMenu="login">
      Log out
    </DropdownItem>
  )
}

export default Logout
