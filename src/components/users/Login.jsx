import React, { useRef, useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";

import validator from "validator";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState([]);
  let loginForm = useRef();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    let er = [];
    setErrors([]);
    switch (true) {
      case validator.isEmpty(email.trim()):
        er.push({ id: 1, msg: "Email is required" });
        break;
      case !validator.isEmail(email.trim()):
        er.push({ id: 2, msg: "Please enter a valid email" });
        break;
      case validator.isEmpty(password.trim()):
        er.push({ id: 3, msg: "Password is required" });
        break;
      case !validator.isStrongPassword(password.trim()):
        er.push({ id: 4, msg: "Please Enter strong password" });
    }
    if (er.length > 0) {
      setErrors(er);
      return;
    }

    axios
      .post(`${import.meta.env.VITE_REQUEST_URL}/users/login`, {
        email,
        password,
      })
      .then((data) => {
        if (data.data.status === "success") {
          dispatch(setUser(data.data.data));
          navigate("/");
        }
      })
      .catch((err) => console.log("Error", err));
  };
  return (
    <div className="form-body">
      <div className="form-container">
        <h1 className="form-header">Login</h1>
        <form
          className="form "
          noValidate
          ref={loginForm}
          onSubmit={submitHandler}
        >
          <Input
            type={"email"}
            title={"Email"}
            onChange={setEmail}
            error={errors?.find((el) => el.id === 1 || el.id === 2)?.msg}
          />
          <Input
            type={"password"}
            title={"Password"}
            onChange={setPassword}
            error={errors?.find((el) => el.id === 3 || el.id === 4)?.msg}
          />
          <button type="submit" className="btn bg-second">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-400">
          I do not have account{" "}
          <Link to={"/register"} className="mx-2 text-second">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
