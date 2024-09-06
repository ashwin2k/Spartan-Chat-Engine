import { useContext, useRef } from 'react';
import { ChatConversations } from './ChatConversations';
import { ChatInput } from './ChatInput';
import { IChatUIProps } from '../../types';
import { AuthContext } from '../../contexts/AuthContext';
import LoginModel from '../LoginModel';

export const ChatUI = ({
    disabled,
    conversations,
    isQuerying,
    customSubmitIcon,
    placeholder,
    onSubmit,
}: IChatUIProps) => {
    const chatConversationsContainerRef = useRef<HTMLDivElement>(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    return (
        <div style={{ height: 'calc(100vh - 68px)' }}>
            {!isLoggedIn && <LoginModel />}
            <div
                ref={chatConversationsContainerRef}
                className="flex w-full justify-center overflow-y-auto pb-8"
                style={{ maxHeight: 'calc(100vh - 250px)' }}
            >
                <ChatConversations
                    conversations={conversations}
                    isQuerying={isQuerying}
                    chatConversationsContainerRef={
                        chatConversationsContainerRef
                    }
                />
            </div>
            <div className="absolute bottom-12 left-0 w-full">
                <ChatInput
                    disabled={disabled}
                    onSubmit={onSubmit}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};
