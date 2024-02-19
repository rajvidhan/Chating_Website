import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { Link, useNavigate} from "react-router-dom"
import  {toast,ToastContainer}  from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute} from '../utils/APIRoutes';
const Login = () => {
    const navigate = useNavigate();
 const [values,setValues]= useState({
    username: "",
    
    password:'',

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
})

const handleValidation =()=>{
    const {password ,username} = values;
    if(password === ""){
       
      toast.error("Email and Password is required",toastOptons);
    return false;
    }
    else if(username.length===''){
        toast.error("Email and Password is required",toastOptons);
        return false;
    }
    return true;
}

const handlesubmit = async (event)=>{
    event.preventDefault();
    if( handleValidation()){
        
         const {password,username} = values;
        
         const {data} = await axios.post(loginRoute,{
         username,
     
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
        <div className="box">
    <form>
         <div className="brand">
                <img src="images/logo.png" alt="" />
                <h1>VidhChat</h1>
            </div>
            <input type="text" 
            placeholder='username' 
            name="username" 
            min = "3"
            onChange={(event)=>handlechange(event)} />

            

             <input type="password" 
            placeholder='password' 
            name="password" 
            onChange={(event)=>handlechange(event)} />

             
            
            <button type='submit' onClick={handlesubmit}>Login User</button>
            <span>Dont't have an account?<Link to="/register">Register</Link></span>
        </form>
  </div>
  <ToastContainer />
    </Container>
  
    
 )
  
}

export default Login
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
      @media only screen and (max-width: 600px) {
      gap:0;
      }
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      h1{
        color: white;
        font-family: cursive;
      }
      img{
        @media only screen and (max-width: 600px) {
        height:7rem;
        }
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