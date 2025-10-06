

import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";


const Messages = () => {
	const {messages} = useGetMessages();
	//console.log(messages);
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{messages.map((message)=>
				<Message key={message._id} message={message.message} createdAt={message.createdAt}/>
			)};					
		</div>
	);
};
export default Messages;
