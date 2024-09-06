import { ContentType } from '../enums/ContentType';
import { MessageRole } from '../enums/MessageRole';
import { RefObject } from 'react';

export type User = {
    firstName: string;
    lastName: string;
};

export type Message = {
    _id: string;
    role: MessageRole;
    message: string;
    userInfo?: User;
    timestamp?: string;
    contentType?: [ContentType];
    email?: string;
    isCurrentMessage:boolean
};
export interface IChatUIProps {
    isQuerying: boolean;
    onSubmit: (value) => void;
    placeholder: string;
    disabled: boolean;
    conversations: Conversations;
    customSubmitIcon?: ReactNode;
}

export interface IChatInputProps {
    disabled: boolean;
    onSubmit: (value) => void;
    placeholder: string;
}
export interface ILoginResponse {
    status: number;
    errors?: [string];
    message?: string;
    chatHistory?: [Message];
    fileUploads?: [IFileMetaData];
}
export interface IChatConversationsProps {
    conversations: Conversations;
    isQuerying: boolean;
    chatConversationsContainerRef: RefObject<HTMLDivElement>;
}

export interface IChatMessageProps {
    message: Message;
}

export interface IFileMetaData {
    name: string;
    text: [string];
    email: string;
    timestamp: Date;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (boolean) => void;
    chatConversations: Conversations;
    uploadedFiles: Array<IFileMetaData>;
    setUploadedFiles: (UploadedFiles) => void;
    setChatConversations: (Conversations) => void;
    socket: WebSocket | undefined;
    setSocket: (WebSocket) => void;
}
export type UploadedFiles = Array<IFileMetaData>;

export type Conversations = Array<Message>;
