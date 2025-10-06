import { create } from "zustand";

const useParticipant = create((set)=>({
    selectedParticipant:null,
    setSelectedParticipant:(selectedParticipant)=>set({selectedParticipant}),
    messages:[],
    setMessages: (messages)=> set({messages}),
}));

export default useParticipant;