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

export interface IChatConversationsProps {
    conversations: Conversations;
    isQuerying: boolean;
    chatConversationsContainerRef: RefObject<HTMLDivElement>;
}

export interface IChatMessageProps {
    message: Message;
}

export type Conversations = Array<Message>;
