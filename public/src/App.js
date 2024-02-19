import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './pages/Register'
import Chat from './pages/Chat'
import Login from './pages/Login'
import SetAvtar from './pages/setAvtar'




const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/register'  element={<Register />}  ></Route>
    <Route path='/login'  element={<Login />}  ></Route>
  
    <Route path='/setAvtar'  element={<SetAvtar />}  ></Route>
    <Route path='/'  element={<Chat />}  ></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
