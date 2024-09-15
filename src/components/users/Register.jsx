 import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import { Link, useNavigate } from 'react-router-dom'
import FormData from 'form-data'
import validator from 'validator';
import axios from 'axios';
 function Register() {
    let [name , setName] = useState('')
    let [email , setEmail] = useState('')
    let [password , setPassword] = useState('')
    let [conPassword , setConPassword] = useState('')
    let [errors, setErrors] = useState([])
    let registrationForm = useRef()
    let s = useRef()
    let navigate = useNavigate()
    const submitHandler = (e)=>{
        e.preventDefault()
        let er =[]
        setErrors([])
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
            case validator.isEmpty(conPassword.trim()):
                er.push({id: 6, msg: "Confirm Password is required"})
                break
            case password.trim()!== conPassword.trim():
                er.push({id: 7, msg: "Confirm Password must match password"})
        }
        if( er.length > 0){
            setErrors(er)
            return
        }
        axios.post(`${import.meta.env.VITE_REQUEST_URL}/users` ,new FormData(e.target)).then(res=> navigate("/login") ).catch(err=> console.log(err))
    }
   return (
    <div className='form-body'>
     <div className='form-container'>
        <h1 className='form-header'>Register</h1>
        <form className='form ' noValidate ref={registrationForm} onSubmit={submitHandler}  >
            <Input name='name' title={"Name"} onChange={setName}  error={errors?.find((el)=> el.id === 1 )?.msg} />
            <Input name='email' type='email' title={"Email"} onChange={setEmail}  error={errors?.find((el)=> el.id === 2 || el.id === 3 )?.msg}/>
            <div className='flex gap-3 items-center]'>
                <label>Image:</label>
                <input name='avatar' type='file' />
            </div>
            <Input name='password' type='password' title={"Password"} onChange={setPassword}  error={errors?.find((el)=> el.id === 4 || el.id === 5 )?.msg} />
            <Input name='confPass' type='password'  title={"Confirm Password"} onChange={setConPassword}  error={errors?.find((el)=> el.id === 6 || el.id === 7 )?.msg}/>
            <button type='submit' className='btn bg-second' ref={s}>Register</button>
        </form>
        <p className='text-sm text-gray-400'>I already have account <Link to={"/login"} className='mx-2 text-second'>Login</Link></p>
     </div>
    </div>
   )
 }
 
 export default Register