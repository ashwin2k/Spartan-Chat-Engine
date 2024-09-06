import React, { createContext, useState } from 'react';
import { AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: (x) => null,
    chatConversations:[],
    setChatConversations: (x) => null,
});
