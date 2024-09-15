import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useSelector } from 'react-redux'

function Header() {
  let user = useSelector((state)=> state.user)
  return (
    <header className='bg-main text-white'>
        <div className='container m-auto lg:max-w-screen-lg flex justify-between items-center py-2 '>
            <div className=' font-bold text-xl'>
                <Link to="/">Auth App</Link>
            </div>
            <div className='flex gap-4'>
              {user.role === 'admin' && <Link to="/admin" className='btn bg-second h-full'>Admin panel</Link>}
                <Logout />
            </div>
        </div>
    </header>
  )
}

export default Header