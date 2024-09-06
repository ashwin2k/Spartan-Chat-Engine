import { useContext, useRef } from 'react';
import { ChatConversations } from './ChatConversations';
import { ChatInput } from './ChatInput';
import { IChatUIProps } from '../../types';
import { AuthContext } from '../../contexts/AuthContext';
import LoginModel from '../Login/LoginModel';
import { FileUploadSideBar } from './FileUploadSideBar';
import { ChatGreeting } from './ChatGreeting';

export const ChatUI = ({
    disabled,
    conversations,
    isQuerying,
    placeholder,
    onSubmit,
}: IChatUIProps) => {
    const chatConversationsContainerRef = useRef<HTMLDivElement>(null);
    const { isLoggedIn, chatConversations } = useContext(AuthContext);
    return (
        <div className="flex flex-row w-full overflow-y-hidden">
            <FileUploadSideBar />
            <div className="flex-grow" style={{ height: 'calc(100vh - 68px)' }}>
                {!isLoggedIn && <LoginModel />}
                {chatConversations.length === 0 && <ChatGreeting />}

                <div
                    ref={chatConversationsContainerRef}
                    className="flex w-4/5 justify-center align-center content-center overflow-y-auto pb-8"
                    style={{ maxHeight: 'calc(100vh - 250px)' }}
                >
                    <ChatConversations
                        conversations={conversations}
                        isQuerying={isQuerying}
                        chatConversationsContainerRef={
                            chatConversationsContainerRef
                        }
                    />
                    <div className="absolute ml-40 bottom-12 w-4/5">
                        <ChatInput
                            disabled={disabled}
                            onSubmit={onSubmit}
                            placeholder={placeholder}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
