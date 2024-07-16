// const mongoose = require("mongoose")
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",//senderId will be refered from the user model
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",//receiverId will be refered from the user model
        required: true
    },
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,//will give us createdAt,updatedAt fields
});

const Message = mongoose.model("Message", messageSchema)
export default Message;