import { useContext, useRef } from 'react';
import { ChatConversations } from './ChatConversations';
import { ChatInput } from './ChatInput';
import { IChatUIProps } from '../../types';
import { AuthContext } from '../../contexts/AuthContext';
import LoginModel from '../LoginModel';
import { FileUploadSideBar } from './FileUploadSideBar';

export const ChatUI = ({
    disabled,
    conversations,
    isQuerying,
    placeholder,
    onSubmit,
}: IChatUIProps) => {
    const chatConversationsContainerRef = useRef<HTMLDivElement>(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    return (
        <div className="flex flex-row w-full overflow-y-hidden">
            <FileUploadSideBar />
            <div className="flex-grow" style={{ height: 'calc(100vh - 68px)' }}>
                {!isLoggedIn && <LoginModel />}
                <div
                    ref={chatConversationsContainerRef}
                    className="flex w-4/5 justify-center overflow-y-auto pb-8"
                    style={{ maxHeight: 'calc(100vh - 250px)' }}
                >
                    <ChatConversations
                        conversations={conversations}
                        isQuerying={isQuerying}
                        chatConversationsContainerRef={
                            chatConversationsContainerRef
                        }
                    />
                    <div className="absolute bottom-12 w-4/5">
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
