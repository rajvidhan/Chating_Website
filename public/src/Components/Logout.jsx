import React from 'react'
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

const Logout = () => {
    const navigate = useNavigate();
    const handleclick = async ()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Container>
        <div>
        <button onClick={handleclick}>Log Out</button>
    </div>
    </Container>
  )
}
const Container = styled.div`
button{
    @media only screen and (max-width: 600px) {
        padding:.7rem .7rem;
        color:black;
        border-radius: 1rem;
    }
    background: hsla(239, 100%, 67%, 1);

    background: linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);
    
    background: -moz-linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);
    
    background: -webkit-linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);
    
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#595CFF", endColorstr="#C6F8FF", GradientType=1 );
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
}`;

export default Logout
