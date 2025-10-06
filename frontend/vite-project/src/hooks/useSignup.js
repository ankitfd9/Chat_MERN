import{ useContext, useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup=()=> {
    const [loading,setLoading] = useState(false);
    const {authUser,setAuthUser} = useAuthContext();
    
    const signup = async ({fullName,username,password,confirmPassword,gender})=>{
        const success = handleInputError({fullName,username,password,confirmPassword,gender});
        
        if(!success) return;
        setLoading(true);
        try{
            console.log(fullName,username,password,confirmPassword);
            const res = await fetch("/api/auth/signup",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({fullName,username,password,confirmPassword,gender})
            })
            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error);
            }

            //localStorage
            localStorage.setItem("chat-user",JSON.stringify(data));
            //context
            setAuthUser(data);

        }catch(error){
            toast.error(error.message);
        }finally{
            console.log("Finally");
            setLoading(false);
        }
    }
    return{loading,signup}
  
}

function handleInputError({fullName,username,password,confirmPassword,gender}){
    if(!fullName||!username||!password||!confirmPassword||!gender){
        console.log(fullName,username,password,confirmPassword,gender);
        toast.error("Please fill all fields.");
        return false;
    }
    if(password!==confirmPassword){
        toast.error("Password do not match confirmPassword.")
        return false;
    }
    if(password.length<6){
        toast.error("Password cannot be less than 6 letters.")
        return false;
    }
    return true;
}

export default useSignup;
