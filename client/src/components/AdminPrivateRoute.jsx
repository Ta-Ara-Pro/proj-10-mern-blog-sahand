import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom" //outlet is representing children

export default function AdminPrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
  return currentUser.isAdmin ? <Outlet /> : <Navigate to='/sign-in'/>
  
}