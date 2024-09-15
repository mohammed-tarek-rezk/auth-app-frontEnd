import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../users/Header";

function AdminHomePage() {
  let [users, setUsers] = useState([]);
  let navigate = useNavigate()
  let user = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REQUEST_URL}/users`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) =>setUsers(res.data.data.users)).catch(res => navigate("/login"))
  }, []);

const sendEmail = (email) =>{
    axios.post(`${import.meta.env.VITE_REQUEST_URL}/mail`, { email })
     .then((res) => console.log("email sended successfully"))
     .catch((err) => console.log(err))
  }

  return (<div>
    <Header />
    <div className="custom-container">
        <div className="flex justify-between">
        <h1 className="text-xl font-bold my-5">Admin Home Page</h1>
        <button>
            <Link to={"/"} className="btn bg-second">{user.username}</Link>
        </button>
        </div>
        <div>
            <table className="w-full text-center" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={user._id} className=" border-b-2 border-gray-300 py-2">
                            <td>{key + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td className="flex gap-2">
                                <button className="btn bg-blue-600">Edit</button>
                                <button className="btn bg-red-600">Delete</button>
                                <button className="btn bg-red-600" onClick={()=> sendEmail(user.email)}>Email</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  </div>) ;
}

export default AdminHomePage;
