import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import Picker, { Emoji } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import axios from "axios";
import { addImageRoute } from "../utils/APIRoutes";
const Chatinput = ({ handlesendmsg }) => {
  const [showemojipicker, setshowemojipicker] = useState(false);
  const [msg, setmsg] = useState("");
  

  const handleEmojiPickerhideShow = () => {
    setshowemojipicker(!showemojipicker);
  };

  const handleEmojiClick = (emoji) => {
    console.log("hello");
    console.log("emoi is ", Emoji);
    // let message = msg;
    // message += emojiObject.emoji;
    // console.log("th message s", message);
    setmsg((prevMessage) => (prevMessage += emoji.emoji));
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handlesendmsg(msg);
      setmsg("");
    }
  };

  return (
    <div>
      <div className=" flex  bg-richblack-800 px-[60px] py-3  items-center justify-between">
        <div className="gap-6 text-2xl flex flex-col absolute bottom-7 z-40    text-yellow-23 cursor-pointer ">
          {showemojipicker && (
            <div >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
          {/* {showemojipicker && <Picker  onEmojiClick={handleEmojiClick} />} */}
         
         <BsEmojiSmileFill
            title="Emoji"
            id="emoji-open"
            onClick={handleEmojiPickerhideShow}
          />
         
   
        </div>

        <form
          className="flex items-center "
          onSubmit={(event) => sendChat(event)}
        >
          <input
            type="text"
            placeholder="type your message here"
            value={msg}
            className="bg-richblack-700 text-white text-bold ml-[90px] w-[1200px] px-6 py-3 rounded-lg "
            onChange={(event) => setmsg(event.target.value)}
          />
        </form>

        <button
          onClick={sendChat}
          className="mr-[80px] text-caribbeangreen-500 text-3xl"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chatinput;
// const Container = styled.div`
// display:grid;
// grid-template-columns:5% 95%;
// @media only screen and (max-width: 600px) {
//   grid-template-columns:0% 100%;
// }
// align-items:center;
// background-color:#080420;
// padding: 0 2rem;
// padding-bottom:0.2rem;
// .button-container{

//   align-items:center;
//   gap:1rem;
//   color:#f8b400;
//   .emoji{

//     display: flex;
//     gap:30px;
//     flex-direction: column-reverse;
//     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//     font-size:25px;
//     cursor:pointer;
//     max-width:500px;
//     z-index:100;
//     position:absolute;
//     bottom:40px;
//     svg {
//       font-size: 1.5rem;
//       color: #ffff00c8;
//       cursor: pointer;
//     }
//     .emoji-picker-react{
//       position:absolute;
//       top:-500px;
//     }
//   }

// }
// .input-container{
//   width:100%;
//   border-radius:2rem;
//   display:flex;
//   flex-direction:row;
//   padding:0;
//   align-items:center;
//   gap:2rem;
//   background-color:#ffffff34;
//   input{
//     width:90%;
//     height:60%;
//     background-color:transparent;
//     color:white;
//     border:none;
//     padding-left:1rem;
//     font-size:1.2rem;
//     &::selection{
//       background-color:#9a86f3;
//     }
//     &:focus{
//       outline:none;
//     }
//   }
//   button{
//     @media only screen and (max-width: 600px) {
//       padding:0.4rem 1.4rem;
//     }
//     padding:0.7rem 2rem;
//     border-radius:2rem;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     cursor:pointer;
//     background: hsla(239, 100%, 67%, 1);

//     background: linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);

//     background: -moz-linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);

//     background: -webkit-linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%);

//     filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#595CFF", endColorstr="#C6F8FF", GradientType=1 );
//     border:none;
//     svg{
//       font-size:2rem;
//       color:white;
//     }
//   }
// }
// `;
