import React,{useState} from 'react'
import styled from "styled-components"
import Picker , { EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation} from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
const Chatinput = ({handlesendmsg}) => {


  const [showemojipicker,setshowemojipicker] = useState(false);
  const [msg,setmsg] =useState("");


  const handleemojipickerhideshow = ()=>{
    setshowemojipicker(!showemojipicker);
  }

  const handleEmojiclick = (event,emojiobject)=>{
     setmsg(prevInput => prevInput + emojiobject.emoji);
  };

const sendChat = (event)=>{
  event.preventDefault();
  if(msg.length>0){
    handlesendmsg(msg);
    setmsg("")
  }
}



  return (
  
    <Container>
      <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleemojipickerhideshow} />
            {
              showemojipicker && <Picker  onEmojiClick={handleEmojiclick} />
            }
        </div>
      </div>
      <form className='input-container' onSubmit={(event)=>sendChat(event)}>
        <input type="text" placeholder='type your message here' value={msg} onChange={(event)=>setmsg(event.target.value)} />
        <button className='submit' >
            <IoMdSend />
        </button>
      </form>

    </Container>
  )
}

export default Chatinput
const Container = styled.div`
display:grid;
grid-template-columns:5% 95%;
@media only screen and (max-width: 600px) {
  grid-template-columns:0% 100%;
}
align-items:center;
background-color:#080420;
padding: 0 2rem;
padding-bottom:0.2rem;
.button-container{
  display:flex;
  align-items:center;
  gap:1rem;
  color:white;
  .emoji{
    @media only screen and (max-width: 600px) {
      display:none;
    }
    position:relative;
    svg{
      font-size:1.5rem;
      color:#ffff00c8;
      cursor:pointer;
    }
    .emoji-picker-react{
      position:absolute;
      top:-350px;
    }  
  }
 
}
.input-container{
  width:100%;
  border-radius:2rem;
  display:flex;
  flex-direction:row;
  padding:0;
  align-items:center;
  gap:2rem;
  background-color:#ffffff34;
  input{
    width:90%;
    height:60%;
    background-color:transparent;
    color:white;
    border:none;
    padding-left:1rem;
    font-size:1.2rem;
    &::selection{
      background-color:#9a86f3;
    }
    &:focus{
      outline:none;
    }
  }
  button{
    @media only screen and (max-width: 600px) {
      padding:0.4rem 1.4rem;
    }
    padding:0.7rem 2rem;
    border-radius:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    background: hsla(239, 100%, 67%, 1);

    background: linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);
    
    background: -moz-linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);
    
    background: -webkit-linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);
    
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#595CFF", endColorstr="#C6F8FF", GradientType=1 );
    border:none;
    svg{
      font-size:2rem;
      color:white;
    }
  }
}
`;