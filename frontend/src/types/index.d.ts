import { ContentType } from '../enums/ContentType';
import { MessageRole } from '../enums/MessageRole';
import { RefObject } from 'react';

export type User = {
    firstName: string;
    lastName: string;
};

export type Message = {
    id: string;
    role: MessageRole;
    message: string;
    userInfo?: User;
    timestamp?: Date
    contentType?:[ContentType]
    email?:string
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
    status:number
    errors?:[string]
    message?:string
    chatHistory?:[Message]
}
export interface IChatConversationsProps {
    conversations: Conversations;
    isQuerying: boolean;
    chatConversationsContainerRef: RefObject<HTMLDivElement>;
}

export interface IChatMessageProps {
    message: Message;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (boolean) => void;
    chatConversations: Conversations;
    setChatConversations: (boolean) => void;
}
export type Conversations = Array<Message>;

