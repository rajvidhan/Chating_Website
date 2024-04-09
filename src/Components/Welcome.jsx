import React from 'react'
import styled from "styled-components"
const Welcome = ({currentuser}) => {
  return (

     <div className='flex gap-10 flex-col bg-[#222831]  items-center justify-center min-h-screen '>
      <img src="images/whatsapp.gif" alt="welcomeimage" className='rounded-full ' />
     
     <h1 className='text-4xl text-white '>Welcome , <span className='text-richblack-50'>{currentuser.username}!</span></h1>
     <h3 className='text-2xl text-white font-bold '>Please select a chat to start Message</h3>
   
     </div>
  )
}

export default Welcome;
