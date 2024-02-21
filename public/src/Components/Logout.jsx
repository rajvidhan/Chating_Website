import React from 'react'
import {useNavigate} from "react-router-dom"

import axios from "axios"


const Logout = () => {
    const navigate = useNavigate();
    const handleclick = async ()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
   <div>
    <div className='flex gap-10'>
      
    </div>
   </div>
  )
}


export default Logout
