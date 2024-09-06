import React, { createContext, useState } from 'react';
import { AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: (x) => null,
    chatConversations: [],
    setChatConversations: (x) => null,
    uploadedFiles: [],
    setUploadedFiles: (x) => null,
    socket: undefined,
    setSocket: (x) => null,
});
