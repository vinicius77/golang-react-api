import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "@/contexts/auth-context"

const ProtectedRoute = () => {
  const authContext = useContext(AuthContext)

  if (!authContext?.state?.authIsReady) return <div>Loading ...</div>
  if (!authContext?.state?.user) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute
