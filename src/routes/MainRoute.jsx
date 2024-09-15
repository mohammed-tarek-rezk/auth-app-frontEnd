
import { Outlet, Route, Routes } from 'react-router-dom'
import HomePage from '../components/users/HomePage'
import Login from '../components/users/Login'
import Register from '../components/users/Register'
import Secrit from '../components/users/Secrit'
import IsAdmin from '../components/admin/IsAdmin'
import AdminHomePage from '../components/admin/AdminHomePage'

function MainRoute() {
  return (
    <Routes>
      
      <Route path='/'  element={<Secrit/>} >
              <Route path=''  element={<HomePage/>} />
      </Route>
        <Route path='/' element={<Outlet />} >
            <Route path='login'  element={<Login/>} />
            <Route path='register'  element={<Register/>} />
        </Route>
        <Route path='/admin'  element={<IsAdmin/>} >
              <Route path=''  element={<AdminHomePage/>} />
      </Route>
    </Routes>
  )
}

export default MainRoute