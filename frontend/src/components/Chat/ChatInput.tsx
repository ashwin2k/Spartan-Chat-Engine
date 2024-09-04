import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useRef } from 'react';
import { IChatInputProps } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Textarea } from '@mui/joy';

export const ChatInput = ({
    disabled,
    onSubmit,
    placeholder,
}: IChatInputProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            const textArea = textAreaRef?.current;
            if (textArea && textArea.value.trim().length > 0) {
                if (onSubmit) {
                    onSubmit(textArea.value);
                }
                textArea.value = '';
            }
        },
        [onSubmit],
    );

    const handleEnterKey = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
            }
        },
        [handleSubmit],
    );

    return (
        <div className="flex justify-center items-center">
            <Textarea
                className={`resize-none w-2/3`}
                onKeyUp={handleEnterKey}
                minRows={2}
                slotProps={{ textarea: { ref: textAreaRef } }}
                placeholder={placeholder ? placeholder : 'Type here to chat'}
                disabled={disabled}
            ></Textarea>
            <IconButton
                className="absolute ml-[58%]"
                disabled={disabled}
                onClick={handleSubmit}
            >
                <FontAwesomeIcon icon={faMagicWandSparkles} />
            </IconButton>
        </div>
    );
};
