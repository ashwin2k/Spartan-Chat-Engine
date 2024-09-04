import React, { useCallback, useState } from 'react';
import { MessageRole } from '../enums/MessageRole';
import { Conversations } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { ChatUI } from './Chat/ChatUI';
function App() {
    const [isQuerying, setIsQuerying] = useState<boolean>(false);
    const [chatConversations, setChatConversations] = useState<Conversations>([
        {
            id: '1',
            role: MessageRole.ASSISTANT,
            message: 'Hi! How can I help you today?',
        },
    ]);

    const handleSubmit = useCallback((value: string) => {
        setIsQuerying(true);
        setChatConversations((conversations) => [
            ...conversations,
            {
                userInfo: { firstName: 'Ash', lastName: 'Win' },
                id: (conversations.length + 1).toString(),
                role: MessageRole.USER,
                message: value,
            },
        ]);
        setTimeout(() => {
            setIsQuerying(false);
            setChatConversations((conversations) => [
                ...conversations,
                {
                    id: (conversations.length + 1).toString(),
                    role: MessageRole.ASSISTANT,
                    message:
                        'This is a mocked sample chat bot assistant response',
                },
            ]);
        }, 3000);
    }, []);

    return (
        <ChatUI
            isQuerying={isQuerying}
            placeholder="Type here to interact with this demo"
            disabled={isQuerying}
            conversations={chatConversations}
            onSubmit={handleSubmit}
        />
    );
}

export default App;
