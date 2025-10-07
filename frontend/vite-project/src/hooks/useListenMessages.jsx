import { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext';
import useParticipants from '../zustand/useParticipant';

const useListenMessages = ()=>{
    const {socket} = useSocketContext();
    const {messages,setMessages} = useParticipants();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            setMessages([...messages,newMessage])
        });

        return () => socket?.off("message");
    }, [socket, setMessages, messages]);
};

export default useListenMessages;