import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useParticipant from "../zustand/useParticipant";

const useGetMessages =()=>{
    const [loading,setLoading] = useState(false);
    const {selectedParticipant,messages,setMessages} = useParticipant();

    useEffect(()=>{
        const getMessages= async ()=>{
            setLoading(true);
            console.log(loading);
            try{
                const res = await fetch(`/api/messages/${selectedParticipant._id}`);
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                console.log(data.conversation.messages);
                
                setMessages(data.conversation.messages);
            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        if(selectedParticipant?._id) getMessages();
    },[selectedParticipant?._id, setMessages]);

    return {loading,messages};
}

export default useGetMessages;