import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { IChatMessageProps } from '../../types';
import { MessageRole } from '../../enums/MessageRole';
import { Avatar } from '@mui/joy';
import Typed from 'typed.js';

const ChatMessage = ({ message}: IChatMessageProps) => {
    const messageRef = useRef<HTMLDivElement>(null);
    const isBot = message.role !== MessageRole.USER;
    useEffect(() => {
        if(message.isCurrentMessage){
            const typed = new Typed(messageRef.current, {
                strings: [message.message],
                typeSpeed: 1,
                showCursor:false,
                

              });
              return () => {
                // Destroy Typed instance during cleanup to stop animation
                typed.destroy();
              };
        }

      }, []);    
    return (
        <div className="mt-4">
            <div className="flex items-center">
                <Avatar className="mr-4">
                    <div className="bg-neutral text-neutral-content h-10 w-10 flex justify-center items-center h-screen">
                        {isBot ? (
                            <FontAwesomeIcon icon={faRobot} />
                        ) : message.userInfo?.firstName &&
                          message.userInfo?.lastName ? (
                            <span>{`${message.userInfo.firstName.charAt(
                                0,
                            )}${message.userInfo.lastName.charAt(0)}`}</span>
                        ) : (
                            <FontAwesomeIcon icon={faUser} />
                        )}
                    </div>
                </Avatar>
                <h4 className="font-semibold select-none">
                    {isBot ? 'Robot' : 'You'}
                </h4>
            </div>
            <div className="ml-16 mt-4">
                <div ref={messageRef}>{message.isCurrentMessage?"":message.message}</div>
            </div>
        </div>
    );
};

export default React.memo(ChatMessage);
