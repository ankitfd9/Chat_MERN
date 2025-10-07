import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";


const useLogin = ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const login = async ({username,password})=>{
        setLoading(true);
        try{
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })
            const data = await res.json();
            console.log(data);
            if(data.error){
                toast.error(data.error);
            }
            setAuthUser(data);
            console.log(data);  
            localStorage.setItem("chat-user",JSON.stringify(data));
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,login};
}

export default useLogin;