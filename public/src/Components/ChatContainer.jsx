import React,{useEffect,useRef,useState} from 'react'
import styled from "styled-components"
import Logout from './Logout'
import Chatinput from './Chatinput'
import {v4 as uuidv4} from "uuid"
import axios from "axios"
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
const ChatContainer = ({currentchat,currentuser,socket}) => {

 const [messages,setmessages]= useState([]);
 const [arrivalMessage,setarrivalMessage]= useState(null);
const scrollRef = useRef();

  useEffect( ()=>{
    if(currentchat){
      
    const fetchData = async () => {  
      const response = await axios.post(getAllMessagesRoute,{
        from:currentuser._id,
        to:currentchat._id,
      });
      setmessages(response.data);}
      fetchData();
    }
  
  },[currentchat])



  
  const handlesendmsg = async (msg)=>{
   
  await axios.post(sendMessageRoute,{
    from:currentuser._id,
    to:currentchat._id,
    message:msg,
  });
  socket.current.emit("send-msg",{
    to:currentchat._id,
    from:currentuser._id,
    message:msg,
  });
  const msgs = [...messages];
  msgs.push({fromSelf:true,message:msg});
  setmessages(msgs);
  };

useEffect(()=>{
if(socket.current){
  socket.current.on("msg-recieve",(msg)=>{
     setarrivalMessage({fromSelf:false,message:msg})
  })
}
},[]);


useEffect(()=>{
  arrivalMessage && setmessages((prev)=>[...prev,arrivalMessage]);
},[arrivalMessage]);


useEffect(()=>{
  scrollRef.current?.scrollIntoView({behaviour:"smooth"});
},[messages]);


const out =()=>{
  window.location.reload(true);
}

  return (
    <>
    {
      
       currentchat && (   <Container>
    <div className="chat-header">
   
        <div className="user-details">
        <img src="images/out.png" className='out' onClick={out} alt="" />
            <div className="avtar">
            
            <img src={`data:image/svg+xml;base64,${currentchat.avtarimage}`} alt="avtar"  />
            </div>
            <div className="username">
                <h3>{currentchat.username}</h3>
            </div>
        </div>
        <Logout />
    </div>

   <div className="chat-message">
      {
        messages.map((message)=>{
          return (
            <div ref={scrollRef} key={uuidv4}>
              <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                <div className="content">
                 <p>
                  {message.message}
                 </p>
                </div>
              </div>
            </div>
          )
        })
      }
   </div>
    <Chatinput handlesendmsg = {handlesendmsg}/>
    </Container>
    )

    }</>
  )
}

export default ChatContainer
const Container = styled.div`
padding-top:1rem;
display:grid;

grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow:hidden;
@media screen and(min-width:720px) and (max-width:1080px){
  grid-template-rows:15% 70% 15%
}

.chat-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 0 2rem ;
  .user-details{
    display:flex;
    align-items:center;
    gap:1rem;
    .out{
      @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
        // display:none;
        height:10px;
      }
     cursor : pointer;
     height:2rem;
     
    }
    .avtar{
      img{
        height:3rem;
      }
     
    }
    .username{
      h3{
        color:white;

      }
    }

  }
}
.chat-message{
  padding:1rem 2rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  overflow:auto;
  &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
      background-color:#ffffff39;
      width:0.1rem;
      border-radius:1rem;
    }
  }
  .message{
    display:flex;
    align-items:center;
    .content{
      max-width:40%;
      overflow-wrap:break-word;
      padding:1rem;
      color:white;
      font-size:1.1rem;
      border-radius:1rem;
    }
  }
.sended{
  justify-content:flex-end;
  .content{
    background: hsla(205, 46%, 30%, 1);

    background: linear-gradient(90deg, hsla(205, 46%, 30%, 1) 0%, hsla(260, 29%, 36%, 1) 100%);
    
    background: -moz-linear-gradient(90deg, hsla(205, 46%, 30%, 1) 0%, hsla(260, 29%, 36%, 1) 100%);
    
    background: -webkit-linear-gradient(90deg, hsla(205, 46%, 30%, 1) 0%, hsla(260, 29%, 36%, 1) 100%);
    
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#295270", endColorstr="#524175", GradientType=1 );
  }
}
.recieved{
  justify-content:flex-start;
  .content{
    background: hsla(213, 77%, 14%, 1);

background: linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);

background: -moz-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);

background: -webkit-linear-gradient(90deg, hsla(213, 77%, 14%, 1) 0%, hsla(202, 27%, 45%, 1) 100%);

filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#08203E", endColorstr="#557C93", GradientType=1 );
    
  }
}
}

`;