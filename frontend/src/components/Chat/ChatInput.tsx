import {
    faGlobe,
    faPaperPlane,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useRef } from 'react';
import { IChatInputProps, IFileMetaData } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Textarea } from '@mui/joy';
import { AuthContext } from '../../contexts/AuthContext';
import { RAGContext } from '../../enums/RAGContext';
import { AlertBox } from '../Utils/Alert';
import { uploadFile } from '../../services/http';
export const ChatInput = ({
    disabled,
    onSubmit,
    placeholder,
}: IChatInputProps) => {
    const { uploadedFiles, setUploadedFiles, ragContext, setRAGContext } =
        useContext(AuthContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log(
                'Selected file:',
                file,
                new Date(file.lastModified).toISOString(),
            );
            uploadFile(file)
                .then((res) => console.log('Uploaded file!', res))
                .catch((err) => console.error(err));
            setUploadedFiles([
                ...uploadedFiles,
                {
                    name: file.name,
                    timestamp: new Date(file.lastModified).toISOString(),
                } as IFileMetaData,
            ]);
        }
    };

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
            <IconButton
                className="absolute"
                aria-pressed={ragContext === RAGContext.WEB}
                onClick={() => {
                    setRAGContext(
                        ragContext === RAGContext.WEB
                            ? RAGContext.FILE
                            : RAGContext.WEB,
                    );
                }}
            >
                <FontAwesomeIcon icon={faGlobe} />
            </IconButton>
            <Textarea
                className={`resize-none w-2/3 ml-2 mr-1`}
                onKeyUp={handleEnterKey}
                minRows={1}
                slotProps={{ textarea: { ref: textAreaRef } }}
                placeholder={placeholder ? placeholder : 'Type here to chat'}
                disabled={disabled}
            ></Textarea>
            <IconButton
                className="absolute"
                disabled={disabled}
                onClick={() => fileInputRef.current?.click()}
            >
                <FontAwesomeIcon icon={faUpload} />
            </IconButton>
            <IconButton
                className="absolute"
                disabled={disabled}
                onClick={handleSubmit}
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </IconButton>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleUpload}
            />
            {ragContext === RAGContext.WEB && (
                <AlertBox
                    text="Now using Web RAG Context."
                    isOpen={ragContext === RAGContext.WEB}
                />
            )}
            {ragContext === RAGContext.FILE && (
                <AlertBox
                    text="Now using File RAG Context."
                    isOpen={ragContext === RAGContext.FILE}
                />
            )}
        </div>
    );
};
