import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = ()=>{
    const [loading,setLoading] =useState(false);
    const [conversations,setConversations] = useState([]);
    useEffect(()=>{
        const getConversations= async ()=>{
            setLoading(true);
            try{
                const res =await fetch("/api/user/",{
                    method:"GET",
                    headers:{"Content-Type":"application/json"},            
                })
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                const participantsArray = Array.isArray(data.result)
                ? data.result.map(item => item.participant)
                : [];
                //console.log(participantsArray);
                setConversations(participantsArray);
                
            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        getConversations();
    },[]);
    return {loading,conversations};
}

export default useGetConversations;