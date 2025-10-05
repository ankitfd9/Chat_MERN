import Conversation from "../model/conversation.model.js";


export const getUsers = async(req,res)=>{
    try{
        const userId = req.user._id;
        const conversations = await Conversation.find({
            participants: userId
        }).populate('participants', '-password');

        
        //const otherUsers = conversations.map(conv => conv.participants.filter(user =>user._id.toString() !== userId.toString()));
        const result = conversations.map(conv => {
        const other = conv.participants.find(p => p._id.toString() !== userId.toString());
            return {
                conversationId: conv._id,
                participant: other
            };
        });

        return res.status(200).json({
            result
        })
    }catch(error){
        console.log("Error in get user controller.",error);
        return res.status(500).json({error:"Internal server error."});
    }
}