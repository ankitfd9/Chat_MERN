//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./router/auth.router.js"
import messageRouter from "./router/message.router.js"
import userRouter from "./router/user.router.js"
import { app,server } from "./socket/socket.js";
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);
app.use("/api/user",userRouter);

/* app.get('/',(req,res)=>{
    console.log("get call");
    res.send("Hello World");
}) */

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);
});

