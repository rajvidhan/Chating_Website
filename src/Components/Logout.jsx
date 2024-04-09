import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import ConfirmationModal from "../Components/ConfirmationModal"





const Logout = () => {


const [confirmationmodalData,setConfirmationmodalData] = useState(null);


    const navigate = useNavigate();
   
    const logout = async ()=>{
        localStorage.clear();
        navigate("/login");
    }

  return (
   <div>
    <div className='flex hover:text-pink-400 gap-10' onClick={()=>setConfirmationmodalData({
       text1:"Are you sure ?",
       text2:"You will be logged out of your account",
       btn1Text:"Logout",
       btn2Text:"Cancle",
       btn1Handler:()=> logout(navigate),
       btn2Handler:()=> setConfirmationmodalData(null),
    })}>
      Log Out
    </div>
    {
      confirmationmodalData && (
        <ConfirmationModal modalData={confirmationmodalData} />
      )
    }
   </div>
  )
}


export default Logout
