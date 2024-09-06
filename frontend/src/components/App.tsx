import React, { useCallback, useState } from 'react';
import { MessageRole } from '../enums/MessageRole';
import { Conversations } from '../types';
import { ChatUI } from './Chat/ChatUI';
import { AuthContext } from '../contexts/AuthContext';
function App() {
    const [isQuerying, setIsQuerying] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [chatConversations, setChatConversations] = useState<Conversations>([]);

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
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,chatConversations,setChatConversations }}>
            <ChatUI
                isQuerying={isQuerying}
                placeholder="Type here to interact with this demo"
                disabled={isQuerying}
                conversations={chatConversations}
                onSubmit={handleSubmit}
            />
        </AuthContext.Provider>
    );
}

export default App;
