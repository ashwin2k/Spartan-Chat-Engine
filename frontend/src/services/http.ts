import axios, { AxiosInstance, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials:true
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
        return response.data;
    } catch (error) {
        return {
            status: 500,
            success: false,
            errors: ['Internal Server Error'],
        };
    }
}
