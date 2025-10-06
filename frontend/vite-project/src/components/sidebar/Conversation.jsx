import useParticipant from "../../zustand/useParticipant";

const Conversation = ({participant}) => {
	const {selectedParticipant,setSelectedParticipant} = useParticipant();
	const isSelected = selectedParticipant?._id === participant._id;
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected}? "bg-sky-500":""`}
				onClick={()=>setSelectedParticipant(participant)}>
				<div className='avatar online'>
					<div className='w-12 rounded-full'>
						<img
							src="https://avatar.iran.liara.run/public"
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200' >{participant.fullName}</p>
						<span className='text-xl'>🎃</span>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;
