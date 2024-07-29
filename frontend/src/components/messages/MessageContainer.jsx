import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { MdVideoCall } from "react-icons/md";
const MessageContainer = () => {
    // const noChatSelected = true;
    const { selectedConversation, setSelectedConversation } = useConversation();

    // const navigate = useNavigate();

    useEffect(() => {
        //cleanup function (unmounts)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    const handleVideoCallClick = () => {
        if (selectedConversation) {
            const roomId = selectedConversation.fullName.replace(/\s+/g, '-');
            window.open(`/room/${roomId}`, '_blank');
        }
    }

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (<NoChatSelected />) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'>
                        <div>
                            <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                        </div>
                        <MdVideoCall className='text-2xl text-gray-900 cursor-pointer' onClick={handleVideoCallClick}/>
                    </div>


                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};