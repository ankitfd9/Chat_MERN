import { cloneElement, useState } from "react";
import toast from "react-hot-toast";
import useParticipant from "../zustand/useParticipant";

const useSendMessage=()=>{
    const [loading,setLoading] = useState(false);
    const {selectedParticipant,setMessages,messages} = useParticipant();

    const sendMessage=async(message)=>{
        setLoading(true);
        try{
            const res = await fetch(`/api/messages/send/${selectedParticipant._id}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({message})
            })
            const data = await res.json();
            //console.log(data);
            if(data.error){
                throw new Error(data.error);
            }
            setMessages([...messages,data.newMessage])
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,sendMessage};
}

export default useSendMessage;