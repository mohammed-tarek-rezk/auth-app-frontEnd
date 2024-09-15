import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

function Secrit(props) {
  let user = useSelector(state => state.user)
  return user.token ? <Outlet /> : <Navigate to={"/login"} />
}

export default Secrit