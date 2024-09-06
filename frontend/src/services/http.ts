import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ILoginResponse } from '../types';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export async function login({ token, uid }: { token: String; uid: String }) {
    const requestBody = {
        token,
        uid,
    };
    try {
        const response: AxiosResponse = await apiClient.post(
            'login/google',
            requestBody,
        );
        const responseData: ILoginResponse = response.data;
        return responseData;
    } catch (error) {
        return {
            status: 500,
            errors: ['Internal Server Error'],
        } as ILoginResponse;
    }
}

export async function reLogin() {
    try {
        const response: AxiosResponse = await apiClient.post(
            'login/google/verify',
        );
        const responseData: ILoginResponse = response.data;
        return responseData;
    } catch (error) {
        return {
            status: 500,
            errors: ['Internal Server Error'],
        } as ILoginResponse;
    }
}
