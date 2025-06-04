import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "@/contexts/auth-context"

import useNavigateUser from "@/hooks/useNavigateUser"

const PublicRoute = () => {
  const authContext = useContext(AuthContext)
  useNavigateUser()

  if (!authContext?.state?.authIsReady) return <div>Loading ...</div>
  if (authContext?.state?.user) return <Navigate to="/" replace />

  return <Outlet />
}

export default PublicRoute
