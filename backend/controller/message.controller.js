import Conversation from "../model/conversation.model.js";
import Message from "../model/messge.model.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";


export const sendMessage = async(req,res)=>{
    try{
        const recieverId = req.params.id;
        const {message} = req.body;
        const senderId =req.user._id;

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId,recieverId]}
        })
        console.log(senderId,recieverId);

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,recieverId]
            });
        }

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(),newMessage.save()]);

        //Socket IO Part
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }

        return res.status(200).json({newMessage})
    }catch(error){
        console.log("Error sending message controller.",error);
        return res.status(500).json({error:"Internal server error."})
    }

}

export const getConversation= async(req,res)=>{
    try{
        const recieverId = req.params.id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId,recieverId]}
        }).populate("messages");


        if(!conversation){
            return res.status(200).json([]);
        }

        return res.status(200).json({conversation})
    }catch(error){
        console.log("Error in getting conversation controller.",error.message);
        return res.status(500).json({error:"Internal server error."})
    }
}