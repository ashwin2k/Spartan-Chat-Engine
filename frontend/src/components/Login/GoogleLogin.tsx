import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../services/firebase';
import { login } from '../../services/http';
import { ILoginResponse } from '../../types';

export const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const signInResult = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(signInResult);
    if (credential) {
        const token = await signInResult.user.getIdToken();
        const uid = signInResult.user.uid;
        if (token) {
            const loginResult: ILoginResponse = await login({ token, uid });
            console.log(token);
            console.log(uid);

            return loginResult;
        } else {
            throw new Error('Error Logging In!');
        }
    }
};
