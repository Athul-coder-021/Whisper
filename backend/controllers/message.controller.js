import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId ,io} from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    // console.log("message sent",req.params.id);
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        //find converstion between these two users
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            },
        })

        //If they are having Conversation for first time then converstin would be null thus we need to create conversation

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })//message array we have by default set empty so no need to set here again
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }


        //The below method of saving is time consuming
        // await  conversation.save();
        // await newMessage.save();

        //The below method is optimization of above one in which process runs in parallel
        await Promise.all([conversation.save(), newMessage.save()]);


        //SOCKET IO functionality will go here
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId)
        {
            //io.to(<socket_id>).emit()  is used to send events to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;//get id of user with whom we are chatting with
        const senderId = req.user._id;//we are sending message

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            },
        }).populate("messages");//with this the message array will be populated with message earlier only id was there

        if (!conversation) return res.status(200).json([]);
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}