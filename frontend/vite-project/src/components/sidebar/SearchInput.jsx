
import { IoSearchSharp } from "react-icons/io5";

import { useState } from "react";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";
import useParticipant from "../../zustand/useParticipant";


const SearchInput = () => {
	const [search,setSearch] = useState('');
	const {conversations} = useGetConversations();
	const {setSelectedParticipant} = useParticipant();

	const handleSubmit = (e)=>{
		e.preventDefault();
		console.log(search);
		if(!search) return;
		if(search.length<3){
			toast.error("Search length is small");
			return;
		}
		const convo = conversations.find((c)=> c.fullName.toLowerCase().includes(search.toLowerCase()));
		console.log(convo);
		if(convo){
			setSelectedParticipant(convo);
			setSearch('');
		}else{
			toast.error("No participant found");
		}
	}
				
	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' 
			value={search}
			onChange={(e)=>setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />				
			</button>
		</form>
	);
};
export default SearchInput;
