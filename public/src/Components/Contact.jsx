import React, { useState, useEffect } from "react";

const Contact = ({ contacts, currentuser, changechat, displaychange }) => {
  const [currentusername, setCurrentUserName] = useState(undefined);
  const [currentuserimage, setCurrentUserImage] = useState(undefined);
  const [display, setDisplay] = useState(true);
  const [currentselected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentuser) {
      setCurrentUserImage(currentuser.avtarimage);
      setCurrentUserName(currentuser.username);
    }
  }, [currentuser]);

  const changecurrentchat = (index, contact) => {
    setCurrentSelected(index);
    changechat(contact);
    setDisplay(false);
  };

  return (
    <>
      {currentuserimage && currentusername && (
        <div className="overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 bg-richblack-700 h-[100vh] flex flex-col justify-between">
         <div>
         <div className=" flex  items-center justify-center ">
            <img
              src="images/logo.png"
              className="rounded-ful w-20 h-20"
           
            />
            <h3 className="text-3xl font-bold text-richblack-100">Vidhchat</h3>
          </div>
          <div className="gap-6 p-4 mt-[20px]  flex flex-col">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`cursor-pointer p-4 rounded-xl bg-[#222831] flex items-center   ${
                    index === currentselected ? "bg-richblack-300" : ""
                  }`}
                  key={index}
                  onClick={() => changecurrentchat(index, contact)}
                >
                  <div className="flex px-5 gap-3 items-center justify-center">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avtarimage}`}
                      alt="avtar"
                      className="w-14 h-14 rounded-full"
                    />
                    <h3 className="font-bold text-white  text-xl ">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
         </div>

          <div className="mb-6 bg-caribbeangreen-600 p-5" >
            <div className=" flex items-center justify-start gap-6">
              <img
                className="w-20 h-20"
                src={`data:image/svg+xml;base64,${currentuserimage}`}
                alt="avtar"
              />

              <h2 className="font-bold text-white text-3xl">
                {currentusername}
              </h2>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Contact;
// const Container = styled.div`

//   display:grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow:hidden;
//   background-color:#222831;
// .brand{

//   display:flex;
//   gap:1rem;
//   align-items:center;
//   justify-content:center;
//   @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
//     justify-content:flex-start;
//   }
//   img{
//    height:2rem;
//    @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
//     height:6rem;}
//   }
//   h3{
//     color:white;
//     text-transform:uppercase;

//     @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
//       font-size:23px;

//       font-family:cursive;

//     }
//   }

//   }
// }
//   .contacts{
//     display:flex;
//     flex-direction:column;
//     align-items:center;
//     overflow:auto;

//     gap:0.8rem;
//     &::-webkit-scrollbar{
//       width:0.2rem;
//       &-thumb{
//         background-color:#ffffff39;
//         width:0.1rem;
//         border-radius:1rem;
//       }
//     }
//     .contact{
//       background-color:#ffffff39;
//       min-height:5rem;
//       width:90%;
//       cursor:pointer;
//       border-radius:0.4rem;
//       padding:0.4rem;
//       gap:1rem;
//       align-items:center;
//       display:flex;
//       transition:0.7s ease-in-out;

//       .avtar{
//         img{
//           height:3rem;
//         }
//         @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
//         padding-right:.3rem;
//         }
//       }
//       .username{
//         h3{
//           @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
//          font-size:23px;
//          color:white;
//          font-family:cursive;
//           }
//           color:black;
//         }
//       }
//     }

//     .selected{
//       background-color:#9186f3;
//     }

//   }
//   .current-user{
//     background-color:#0d0d30;
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     gap:2rem;
//     .avtar{
//       img{
//         height:4rem;
//         max-line-size:100%;
//       }
//     }
//     .username{
//       h2{
//         color:white;
//         @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
//           font-size:28px;
//           color:white;
//           font-family:cursive;
//         }
//       }
//     }

//     @media screen and(min-width:720px) and (max-width:1080px{
//      .username{
//       h2{
//         font-size:1rem;
//         color:black;
//       }
//      }
//     }
//   }

// }

// `;
