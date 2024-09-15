import React, { useEffect, useState } from "react";
import InfoPar from "./InfoPar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import validator from "validator";


const MySwal = withReactContent(Swal)
function UserInfo() {
  let user = useSelector(state => state.user)
  let [userData , setUserData] = useState({})
  let navigate = useNavigate()
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_REQUEST_URL}/users/${user._id}`,  {
      headers: {
          'Authorization': `Bearer ${user.token}`,
      }
  }).then(res => setUserData(res.data.data.user)).catch(()=> navigate("/"))
  },[])

const confermUpdateHandler = (e)=>{
    e.preventDefault()
    let name = document?.getElementById("name")?.value;
    let email = document?.getElementById("email")?.value;
    let password = document?.getElementById("password")?.value;
    let er =[]
    switch(true){
        case validator.isEmpty(name.trim()):
            er.push({id: 1, msg: "Name is required"})
            break;
        case validator.isEmpty(email.trim()):
            er.push({id: 2, msg: "Email is required"})
            break;
        case !validator.isEmail(email.trim()):
            er.push({id: 3, msg: "Please enter a valid email"})
            break
        case validator.isEmpty(password.trim()):
              er.push({id: 4, msg: "Password is required"})
              break
          case !validator.isStrongPassword(password.trim()):
              er.push({id: 5, msg: "Please Enter strong password"})
              break;
    }
    if( er.length > 0){
        document.getElementById("error").innerHTML = "invalid data"
        return
    }
    axios.put(`${import.meta.env.VITE_REQUEST_URL}/users/${userData._id}` ,new FormData(e.target), {headers: {Authorization: `Bearer ${user.token}`}}).then(res=> window.location.reload() ).catch(err=> console.log(err))
}

  const updateHandler = (e) => {
    MySwal.fire({
      title: <p>update {userData?.username}</p>,
      html: 
      <form id="update" onSubmit={confermUpdateHandler} className="bg-main py-6 text-white rounded-lg flex flex-col gap-2">
        <div id="error" className="text-second text-sm"></div>
        <input type="text" value={userData?._id} className="hidden" id="id"/>
        <div className="flex items-start flex-col gap-1 px-2 w-full">
          <label className="text-sm">Name</label>
          <input className="w-full text-main outline-none px-4 py-2  rounded-md" type="text" name="name" defaultValue={userData?.username} id="name"/>
        </div>
        <div className="flex items-start flex-col gap-1 px-2 w-full">
          <label className="text-sm">Email</label>
          <input className="w-full text-main outline-none px-4 py-2  rounded-md" type="email" name="email" defaultValue={userData?.email} id="email"/>
        </div>
        <div className="flex items-start flex-col gap-1 px-2 w-full">
          <label className="text-sm">avatar</label>
          <input className="w-full text-main outline-none px-4 py-2  rounded-md" type="file" name="avatar" id="file"/>
        </div>
        <div className="flex items-start flex-col gap-1 px-2 w-full">
          <label className="text-sm">password</label>
          <input className="w-full text-main outline-none px-4 py-2  rounded-md " type="password" name="password"  id="password"/>
        </div>
        <div className="flex items-start flex-col gap-1 px-2 w-full">
          <input className="w-full text-text bg-second outline-none px-4 py-2  rounded-md" type="submit" />
        </div>
      </form>,
      showConfirmButton: false, 
        showCancelButton: true,
        confirmButtonText: "update",
        cancelButtonText: `cancel`,
        cancelButtonColor: "red",
        confirmButtonColor: "green",
        backdrop: `rgba(0,0,0,0.4)`,
      
    })
  }
  const delteHandler = () => {
    MySwal.fire({title: <h1>Are you sure delete {userData.username}?</h1> , showCancelButton : true ,  confirmButtonColor: "red" }).then((res)=>{
      if (res.isConfirmed){
        axios.delete(`${import.meta.env.VITE_REQUEST_URL}/users/${userData._id}`, {
          headers: {
              'Authorization': `Bearer ${user.token}`,
          }
        }).then(()=> navigate("/login")).catch(err=> console.log(err))
      }
    })
  }
  return (
    <div className="custom-container my-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">{userData?.username}</h1>
            <InfoPar title={"Email:"} value={userData?.email} />
            <InfoPar title={"Role:"} value={userData?.role} />
            <div className="flex gap-2">
                <button className="btn bg-green-600" onClick={updateHandler}>Update</button>
                <button className="btn bg-red-700" onClick={delteHandler}>delete</button>
            </div>
            
        </div>
        <img src={`${import.meta.env.VITE_REQUEST_URL}/images/${userData?.avatar}`} className="w-40 h-40 rounded-full object-cover outline-2 outline-second outline outline-offset-2"/>
      </div>
    </div>
  );
}

export default UserInfo;
