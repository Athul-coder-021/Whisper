// const mongoose = require("mongoose")
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message',
            default:[],//initially empty array
        }
    ]
}, {
    timestamps: true,//will give us createdAt,updatedAt fields
});

const Conversation = mongoose.model("Conversation", conversationSchema)
export default Conversation;