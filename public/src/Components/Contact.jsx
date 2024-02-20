import React,{useState,useEffect} from 'react'
import styled from "styled-components"

const Contact = ({contacts,currentuser, changechat,displaychange}) => {
const [currentusername,setCurrentUserName]= useState(undefined)
const [currentuserimage,setCurrentUserImage] = useState(undefined)
const [display,setDisplay] = useState(true);
const [currentselected,setCurrentSelected] = useState(undefined);
useEffect(()=>{
  if(currentuser){
    setCurrentUserImage(currentuser.avtarimage);
    setCurrentUserName(currentuser.username);
  }
},[currentuser]);

const changecurrentchat = (index,contact) =>{
  setCurrentSelected(index);
  changechat(contact);
  setDisplay(false);
  
}

  return <>
      {   
          currentuserimage && currentusername &&(
            // display &&(
              <Container >
            <div className="brand">
              <img src="images/logo.png" className='logo' alt="" />
              <h3>Vidhchat</h3>
            </div>
            <div className="contacts">
              {
                  contacts.map((contact,index)=>{
                    return (
                      <div className={`contact ${index  === currentselected ? "selected": ""}`}  key = {index} onClick={()=>changecurrentchat(index,contact)}>
                       <div className="avtar">
                        <img src={`data:image/svg+xml;base64,${contact.avtarimage}`} alt="avtar"  />
                       </div>
                       <div className="username">
                        <h3>{contact.username}</h3>
                       </div>
                      </div>
                    )
                  })
              }
             
            </div>
         
            <div className="current-user">
            <div className="avtar">
                        <img src={`data:image/svg+xml;base64,${currentuserimage}`} alt="avtar"  />
                       </div>
                       <div className="username">
                        <h2>{currentusername}</h2>
                       </div>
            </div>
          </Container>
            )
          // )

   
  
 }
    </>;
  
}

export default Contact
const Container = styled.div`

  display:grid;
  grid-template-rows: 10% 75% 15%;
  overflow:hidden;
  background-color:#222831;
.brand{
  
  display:flex;
  gap:1rem;
  align-items:center;
  justify-content:center;
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    justify-content:flex-start;
  }
  img{
   height:2rem;
   @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    height:6rem;}
  }
  h3{
    color:white;
    text-transform:uppercase;
   
    @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
      font-size:23px;
    
      font-family:cursive;
      
    }
  }
    
  }
}
  .contacts{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    
    gap:0.8rem;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background-color:#ffffff39;
        width:0.1rem;
        border-radius:1rem;
      }
    }
    .contact{
      background-color:#ffffff39;
      min-height:5rem;
      width:90%;
      cursor:pointer;
      border-radius:0.4rem;
      padding:0.4rem;
      gap:1rem;
      align-items:center;
      display:flex;
      transition:0.7s ease-in-out;
      
      .avtar{
        img{
          height:3rem;
        }
        @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
        padding-right:.3rem;
        }
      }
      .username{
        h3{
          @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
         font-size:23px;
         color:white;
         font-family:cursive;
          }
          color:black;
        }
      }
    }
    
    .selected{
      background-color:#9186f3;
    }
    
  }
  .current-user{
    background-color:#0d0d30;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:2rem;
    .avtar{
      img{
        height:4rem;
        max-line-size:100%;
      }
    }
    .username{
      h2{
        color:white;
        @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
          font-size:28px;
          color:white;
          font-family:cursive;
        }
      }
    }
  
    @media screen and(min-width:720px) and (max-width:1080px{
     .username{
      h2{
        font-size:1rem;
        color:black;
      }
     }
    }
  }
  
}

`;