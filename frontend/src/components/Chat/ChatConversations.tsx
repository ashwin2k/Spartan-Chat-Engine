import { LinearProgress } from '@mui/joy';
import { IChatConversationsProps } from '../../types';
import ChatMessage from './ChatMessage';
import { useEffect } from 'react';
export const ChatConversations = ({
    conversations,
    isQuerying,
    chatConversationsContainerRef,
}: IChatConversationsProps) => {
    useEffect(() => {
        const chatConversationsContainer =
            chatConversationsContainerRef?.current;
        if (chatConversationsContainer) {
            chatConversationsContainer.scrollTo(
                0,
                chatConversationsContainer.scrollHeight,
            );
        }
    }, [conversations]);

    return (
        <div className="w-2/3">
            {conversations &&
                conversations.map((chatEntry) => (
                    <ChatMessage
                        key={`chatbot-message-${chatEntry._id}`}
                        message={chatEntry}
                    />
                ))}
            {isQuerying && (
                <LinearProgress
                    className="w-32 ml-16 mt-4"
                    style={{ color: 'black' }}
                />
            )}
        </div>
    );
};
