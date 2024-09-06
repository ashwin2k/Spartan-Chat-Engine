import React, { useCallback, useEffect, useState } from 'react';
import { MessageRole } from '../enums/MessageRole';
import { Conversations, ILoginResponse, UploadedFiles } from '../types';
import { ChatUI } from './Chat/ChatUI';
import { AuthContext } from '../contexts/AuthContext';
import { reLogin } from '../services/http';
import Cookies from 'js-cookie';
import { createConnection, sendMessage } from '../services/websocket';
import { RAGContext } from '../enums/RAGContext';
function App() {
    const [isQuerying, setIsQuerying] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [ragContext, setRAGContext] = useState<RAGContext>(RAGContext.FILE);

    const [chatConversations, setChatConversations] = useState<Conversations>(
        [],
    );
    const [socket, setSocket] = useState<WebSocket>();
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>([]);
    const handleSubmit = (value: string) => {
        setIsQuerying(true);
        setChatConversations((conversations) => [
            ...conversations,
            {
                _id: (conversations.length + 1).toString(),
                role: MessageRole.USER,
                message: value,
                isCurrentMessage: false,
            },
        ]);
        if (socket)
            sendMessage(
                socket,
                value,
                Cookies.get('token') || '',
                Cookies.get('uid') || '',
                ragContext,
            );
    };

    useEffect(() => {
        reLogin().then((loginResult: ILoginResponse) => {
            if (loginResult.status === 200) {
                setChatConversations(loginResult.chatHistory || []);
                setIsLoggedIn(true);
                setUploadedFiles(loginResult?.fileUploads || []);
            }
        });
        const socketConnection = createConnection(
            setChatConversations,
            setIsQuerying,
        );
        setSocket(socketConnection);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                chatConversations,
                setChatConversations,
                uploadedFiles,
                setUploadedFiles,
                socket,
                setSocket,
                ragContext,
                setRAGContext,
            }}
        >
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
