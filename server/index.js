const express = require("express");

const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const messageRoute = require("./routes/messagesRoute")
const socket = require("socket.io");

require("dotenv").config();
const app = express();
var cors = require('cors');
app.use(cors());
const port = 3000;

app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute);


mongoose.connect("mongodb://0.0.0.0:27017/chat",{useNewUrlParser:true})
.then(()=> console.log("hello connect ho gya hu bhai"))
.catch((err)=> console.log("nhi hu bhai dekhle connect or ye dekh error "+ " "+ err));

const server = app.listen(port,()=>{
    console.log(`the surver is running on : ${port}`);
});

const io = socket(server,{
    cors:{
        origin:"http://localhost:3001", //check here vidhan 
        credentials:true,
    },
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})


