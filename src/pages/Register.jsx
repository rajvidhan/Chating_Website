import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { Link, useNavigate} from "react-router-dom"
import  {toast,ToastContainer}  from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute} from '../utils/APIRoutes';
const Register = () => {
 const navigate = useNavigate();
 const [values,setValues]= useState({
    username: "",
    email:"",
    password:'',
    confirmpassword:""
 });

const toastOptons ={
    positions:"bottom-left",
    autoclose:8000,
    pauseOnhover:true,
    draggable:true,
    theme:"dark"
}


useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }
  });

const handleValidation =()=>{
    const {password , confirmpassword,email,username} = values;
    if(password !== confirmpassword){
       
    toast.error("password and confirm password should be same",toastOptons);
    return false;
    }
    else if(username.length<3){
        toast.error("Username should be greater than 3 charecters",toastOptons);
        return false;
    }
    else if(password.length<8){
        toast.error("Password should be equal and greater than 8 charecters",toastOptons);
        return false;
    }
    else if(email===""){
        toast.error("Email is required",toastOptons);
        return false;
    }
    return true;
}

const handlesubmit = async (event)=>{
    event.preventDefault();
    if( handleValidation()){
        
         const {password ,email,username} = values;
        
         const {data} = await axios.post(registerRoute,{
         username,
         email,
         password,
    });
    if(data.status ===false){
        toast.error(data.msg,toastOptons);
    }
    if(data.status === true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        navigate("/");
    }
  }

}

const handlechange = (event)=>{
    setValues({...values,[event.target.name]:event.target.value});
}


  return (
   <Container>
     <div>
        <div className="box">
    <form>
         <div className="brand">
                <img src="images/logo.png" alt="" />
                <h1>VidhChat</h1>
            </div>
            <input type="text" 
            placeholder='username' 
            name="username" 
            onChange={(event)=>handlechange(event)} />

             <input type="email" 
            placeholder='Email' 
            name="email" 
            onChange={(event)=>handlechange(event)} />

             <input type="password" 
            placeholder='password' 
            name="password" 
            onChange={(event)=>handlechange(event)} />

             <input type="password" 
            placeholder='Confirm password' 
            name="confirmpassword" 
            onChange={(event)=>handlechange(event)} />
            
            <button type='submit' onClick={handlesubmit}>Create User</button>
            <span>Already have an account?<Link to="/login">Login</Link></span>
        </form>
  </div>
  <ToastContainer />
    </div>
   </Container>
  
    
 )
  
}

export default Register
const Container = styled.div`
.box{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    form{
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: #00000076;
      border-radius: 2rem;
      padding: 3rem 5rem;
      .brand{
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        @media only screen and (max-width: 600px) {
          gap:0;
          }
        h1{
          color: white;
          font-family: cursive;
        }
        img{
          height: 5rem;
        }
      }
      input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus{
             border: 0.1rem solid #997af0;
             outline: none;
        }
      }
      button{
        background-color:#997af0 ;
        color: white;
        padding: 1rem 2rem;
        border: none;
        cursor: pointer;
        font-weight: bold;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
      color: white;
      text-transform: uppercase;
      a{
        @media only screen and (max-width: 600px) {
          font-size:23px;
          
             }
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
        text-decoration: none;
        margin:10px;
    }
    
  
  }
    }
  }
`;