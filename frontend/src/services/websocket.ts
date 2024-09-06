import React from 'react';
import { Conversations } from '../types';
import { MessageRole } from '../enums/MessageRole';
import { RAGContext } from '../enums/RAGContext';

export const createConnection = (
    setChatConversations: React.Dispatch<React.SetStateAction<Conversations>>,
    setIsQuerying: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws');
    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const newMessage = event.data;
        setIsQuerying(false);
        setChatConversations((conversations) => [
            ...conversations,
            {
                _id: (conversations.length + 1).toString(),
                role: MessageRole.ASSISTANT,
                message: newMessage,
                isCurrentMessage: true,
            },
        ]);
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected');
        window.location.reload();
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return socket;
};

export const sendMessage = (
    socket: WebSocket,
    message: string,
    token: string,
    uid: string,
    ragContext: RAGContext,
) => {
    const data = {
        message,
        role: 'user',
        contentType: 'text',
        metaData: {
            token,
            uid,
        },
        rag: ragContext,
    };
    socket.send(JSON.stringify(data));
};
