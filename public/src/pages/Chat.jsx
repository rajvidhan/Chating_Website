import React,{useState,useEffect,useRef} from 'react'
import styled from "styled-components"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { allusersRoute,host } from '../utils/APIRoutes'
import Contact from '../Components/Contact'
import Welcome from '../Components/Welcome'
import ChatContainer from '../Components/ChatContainer'
import {io} from  "socket.io-client"
const Chat = () => {

  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentuser , setCurrentUser] = useState(undefined);
  const [currentchat,setCurrentChat] = useState(undefined);

  
  const [isloaded,setisloaded] = useState(false);
  useEffect(
    
      () =>{
     const setup = async ()=>{if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setisloaded(true);
  }}
    setup();
  },[])

useEffect(()=>{
  if(currentuser){
    socket.current = io(host);
    socket.current.emit("add-user",currentuser._id);
  }
},[currentuser])


  useEffect( ()=>{
    if(currentuser){
       if(currentuser.isAvtarImageSet){
      const handlecon = async()=>{ 
        const data = await axios.get(`${allusersRoute}/${currentuser._id}`);
        setContacts(data.data);
      }
      handlecon();
        
       }else{
        navigate("/setAvtar")
       }
    }
  },[currentuser]);

const handlechatchange=(chat)=>{
  setCurrentChat(chat);
}

  return (
    <Container>
    <div className="container">
      <Contact  contacts={contacts}
       currentuser= {currentuser}
       
       changechat = {handlechatchange} />
       {
        isloaded && currentchat=== undefined?(<Welcome currentuser= {currentuser} />):(<ChatContainer socket = {socket} currentchat = {currentchat} currentuser = {currentuser} />)
       }
       
    </div>
    </Container>
  )
}


const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
align-items:center;
flex-direction:column;
justify-content:center;
background-color:#131324;

.container{
  height:85vh;
  border-radius:20px;
  width:85vw;
  background-color:#00000076;
  display:grid;
  
  grid-template-columns:25% 75%;
  
  @media  screen and (min-device-width : 320px) and (max-device-width : 480px) {
    grid-template-columns:100% 0%;
    height:100vh;
    width:100vw;
}
  
  @media screen and(min-width:720px) and (max-width:1080px){
    grid-template-columns:35% 65%;
  }

}
`;
export default Chat

