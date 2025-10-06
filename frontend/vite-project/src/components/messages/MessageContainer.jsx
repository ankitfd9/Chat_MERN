
import { useEffect } from "react";
import useParticipant from "../../zustand/useParticipant";
import MessageInput from "./MessageInput";
import Messages from "./Messages";


const MessageContainer = () => {
	const {selectedParticipant,setSelectedParticipant} = useParticipant();

	useEffect(()=>{
		//cleanup function unmount
		return ()=>setSelectedParticipant(null);

	},[setSelectedParticipant]);
	
	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedParticipant ?(
				<div className='flex flex-col items-center justify-center h-full text-center p-4'>
					<h2 className='text-2xl font-bold mb-2'>Select a conversation</h2>
					<p className='text-gray-600'>Choose a chat to start messaging</p>
				</div>
			):
			<>
				{/* Header */}
				<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> 
					<span className='text-gray-900 font-bold'>{selectedParticipant.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
	}
		</div>
	);
};
export default MessageContainer;
