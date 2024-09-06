import React, { createContext, useState } from 'react';
import { AuthContextType } from '../types';
import { RAGContext } from '../enums/RAGContext';

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: (x) => null,
    chatConversations: [],
    setChatConversations: (x) => null,
    uploadedFiles: [],
    setUploadedFiles: (x) => null,
    socket: undefined,
    setSocket: (x) => null,
    ragContext: RAGContext.FILE,
    setRAGContext: (x) => null,
});
