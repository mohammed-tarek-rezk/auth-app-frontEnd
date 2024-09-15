import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../../store/slices/userSlice'

function Logout() {
  let dispatch = useDispatch()
  return (
    <button className='bg-second px-4 py-2 rounded-lg' onClick={()=> dispatch(setUser({}))}>Logout</button>
  )
}

export default Logout