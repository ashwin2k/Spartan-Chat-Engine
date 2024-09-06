import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useContext, useState } from 'react';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from './GoogleLogin';
import { AlertBox } from './Utils/Alert';
import { LoginFlow } from '../enums/LoginFlow';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginModel() {
    const [loginProgress, setLoginProgress] = useState<number>(0);
    const { setIsLoggedIn, setChatConversations, setUploadedFiles } =
        useContext(AuthContext);

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={true}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    minWidth: 800,
                    maxWidth: 1500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                    minHeight: 200,
                    alignContent: 'center',
                }}
            >
                <div className="flex flex-row justify-between items-center	">
                    <div className="max-w-md">
                        <Typography
                            component="h1"
                            id="modal-title"
                            level="h1"
                            textColor="inherit"
                            sx={{ fontWeight: 'lg', mb: 1 }}
                        >
                            Login or Create Account
                        </Typography>
                        <Typography id="modal-desc" textColor="text.tertiary">
                            You need to be logged in to access this Demo by{' '}
                            <br />
                            <b>Ashwin kumar</b>
                        </Typography>
                    </div>

                    <GoogleButton
                        onClick={async () => {
                            try {
                                setLoginProgress(LoginFlow.POPUP);
                                const loginResult = await signInWithGoogle();
                                setChatConversations(
                                    loginResult?.chatHistory || [],
                                );
                                setLoginProgress(LoginFlow.SUCCESS);
                                setUploadedFiles(
                                    loginResult?.fileUploads || [],
                                );
                                setIsLoggedIn(true);
                            } catch (error) {
                                setLoginProgress(LoginFlow.ERROR);
                                console.error(error);
                            }
                        }}
                    />
                    {loginProgress == LoginFlow.POPUP && (
                        <AlertBox
                            text="Continue on the Google popup."
                            isOpen={loginProgress == LoginFlow.POPUP}
                        />
                    )}
                    {loginProgress == LoginFlow.SUCCESS && (
                        <AlertBox
                            text="Successfully logged In!"
                            isOpen={loginProgress == LoginFlow.SUCCESS}
                        />
                    )}
                    {loginProgress == LoginFlow.ERROR && (
                        <AlertBox
                            text="Error logging in. Please try again."
                            isOpen={loginProgress == LoginFlow.ERROR}
                        />
                    )}
                </div>
            </Sheet>
        </Modal>
    );
}
