// const express = require('express');
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.router.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


// const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();


// app.get("/", (req, res) => {
//     //root route http://localhost:5000/
//     res.send("Welcome to Home page!!");
// })

//Middlewares
app.use(express.json());//used to parse the incoming requests with JSON paylods (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});