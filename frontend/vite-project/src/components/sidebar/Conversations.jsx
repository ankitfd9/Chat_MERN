
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";


const Conversations = () => {
	const {loading,conversations} = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((participant) => <Conversation key={participant._id} participant={participant}/>)}
		</div>
	);
};
export default Conversations;
