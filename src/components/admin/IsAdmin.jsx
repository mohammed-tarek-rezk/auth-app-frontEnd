import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function IsAdmin() {
    let user = useSelector(state => state.user)
  return user.token && user.role === 'admin'? <Outlet/> : <Navigate to={"/login"}/>
}

export default IsAdmin