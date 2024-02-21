import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allusersRoute, host } from "../utils/APIRoutes";
import Contact from "../Components/Contact";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";

import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentuser, setCurrentUser] = useState(undefined);
  const [currentchat, setCurrentChat] = useState(undefined);

  const [isloaded, setisloaded] = useState(false);
  useEffect(() => {
    const setup = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setisloaded(true);
      }
    };
    setup();
  }, []);

  useEffect(() => {
    if (currentuser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentuser._id);
    }
  }, [currentuser]);

  useEffect(() => {
    if (currentuser) {
      if (currentuser.isAvtarImageSet) {
        const handlecon = async () => {
          const data = await axios.get(`${allusersRoute}/${currentuser._id}`);
          setContacts(data.data);
        };
        handlecon();
      } else {
        navigate("/setAvtar");
      }
    }
  }, [currentuser]);

  const handlechatchange = (chat) => {
    setCurrentChat(chat);
  };

  return (

      <div className="flex">
        <div className="flex w-full">
        <div className="w-[20%]">
        <Contact
        
          contacts={contacts}
          currentuser={currentuser}
          changechat={handlechatchange}
        />
        </div>
        {isloaded && currentchat === undefined ? (
          <div className="w-[80%] ">
            <Welcome currentuser={currentuser} />
            </div>
        ) : (
          <div className="w-[80%]">
            <ChatContainer
            socket={socket}
            currentchat={currentchat}
            currentuser={currentuser}
          />
          </div>
        )}
      </div>
      </div>
   
  );
};

// const Container = styled.div`
//   height: 100vh;
//   width: 100vh;
//   display: flex;

//   flex-direction: column;

//   .container {
//     height: 100vh;

//     width: 100vw;
//     background-image: url("https://e1.pxfuel.com/desktop-wallpaper/461/478/desktop-wallpaper-whatsapp-dark-whatsapp-chat.jpg");
//     background-size: 400px;
//     display: grid;

//     grid-template-columns: 25% 75%;

//     @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
//       grid-template-columns: 100% 0%;
//       height: 100vh;
//       width: 100vw;
//     }

//     @media screen and(min-width:720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;
export default Chat;
