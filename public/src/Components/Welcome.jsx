import React from 'react'
import styled from "styled-components"
const Welcome = ({currentuser}) => {
  return (
    <Container>
     <img src="images/welcome.png" alt="welcomeimage" className='floatimage' />
     
     <h1>Welcome , <span>{currentuser.username}!</span></h1>
     <h3>Please select a chat to start Message</h3>
    </Container>
  )
}

export default Welcome;
const Container = styled.div
`display:flex;
align-items:center;
justify-content:center;
color:white;
flex-direction:column;
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  display:none;
}
.floatimage{
    height:20rem;
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-bottom:23px;
}
span{
    color:#4e0eff;
   
    font-family:cursive;
}
h1{
    margin-bottom:23px;
}
@keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }    
}
`;
