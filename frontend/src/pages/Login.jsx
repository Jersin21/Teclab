import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIroute";

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  useEffect(()=>{
    if(localStorage.getItem("LabUser")){
      navigate("/")
    }
  },[])
  const toastOptions =  {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
}
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(handleValidation()){
        const {username,password} = values
        const {data} = await axios.post(loginRoute,{
            username,
            password,
        })
        if(data.status === false){
          toast.error(data.msg, toastOptions)
        }
        if(data.status === true){
          localStorage.setItem("LabUser",JSON.stringify(data.user))
          navigate("/")
        }
    }
  };
  const handleValidation = () => {
    const { username, password,  } = values;
    if (password === "") {
      toast.error("Username and password is required", toastOptions,
      );
      return false
    }else if(username === ""){
        toast.error("Username and password is required",toastOptions)
        return false
    }
    return true
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Santa Fe</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account?<Link to="/register">Register</Link>{" "}
          </span>
        </form>
      </FormContainer>
      <ToastContainer transition={Flip}/>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
