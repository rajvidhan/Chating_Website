import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate} from "react-router-dom"
import loader from "../assets/loader.gif"
import  {toast,ToastContainer}  from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Buffer} from 'buffer'
import axios from "axios";
import { setAvtarRoute} from '../utils/APIRoutes';

const SetAvtar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

const [avtars, setAvtars] = useState([]);
const [isLoading, setLoading] = useState(true);
const [selectedavtar , setselectedavtar] = useState(undefined);


useEffect( ()=>{
  if(!localStorage.getItem("chat-app-user")){
    navigate("/login");
  }
});


const toastOptons ={
    positions:"bottom-left",
    autoclose:8000,
    pauseOnhover:true,
    draggable:true,
    theme:"dark"
}


const setprofilepicture = async () => {
  if(selectedavtar === undefined){
    toast.error("vidhan say's : Please select the avatar first",toastOptons)
  }
  else{
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
 
    const {data} = await axios.post(`${setAvtarRoute}/${user._id}`,{
      image : avtars[selectedavtar],
    });
  
    if(data.isSet){
      user.isAvtarImageSet= true;
      user.avtarimage= data.image;
    
      localStorage.setItem("chat-app-user",JSON.stringify(user));
      navigate("/")
    }else{
      toast.error("Sorry : Error setting avtar.Please try again",toastOptons);
    }
  }
};



useEffect(()=>{
   async function fatchdata(){
    const data  = [];
    for(let i =0;i<4;i++){
        const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
    }
    setAvtars(data);
    
    setLoading(false);
   }
   fatchdata();
},[]);


  return (
   <>
   {
    isLoading ? <Container>
      <img src={loader} className='loader' alt="" />
    </Container>: (
      <Container >

      <div className='title'>
      <h1>
       Pick an avtar as your profile picture
      </h1>
      </div>
       <div className='avtars'>
       {
        avtars.map((avtar,index) => {
        return (
         <div  key={index} className= {`avtar ${selectedavtar === index ? "selected":''}`}>
           <img src={`data:image/svg+xml;base64,${avtar}`} alt="avtar" onClick={()=>setselectedavtar(index)}/>
   
         </div>
        )
   })
       }
   
       </div>
      <button className="submit-btn" onClick={setprofilepicture}>Set as Profile picture</button>
      </Container>
    )}
  
   <ToastContainer />
   </>
  )}
const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;
.loader{
  max-inline-size:100%
}
.title{
  h1{
    color:white;
  }
}
.avtars{
  display:flex;
  gap:2rem;
  .avtar{
    border:0.4rem solid transparent;
    padding:0.4rem;
    border-radius:5rem;
    display:flex;
    justify-content:center;
    align-items:center;
    transition:0.5s ease-in-out;
    img {
      height:6rem;
    }
  }
  .selected{
    border:0.4rem solid #4e0eff;
  }
 
}
.submit-btn{
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
}`
export default SetAvtar
