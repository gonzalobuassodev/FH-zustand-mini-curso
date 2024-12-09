import { AxiosError } from "axios";
import { tesloApi } from "../api/teslo.api";

interface LoginResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: string;
    roles: string[];
    token: string;
}


export class AuthService {

    static login = async (email: string, password: string): Promise<LoginResponse> => {

        try {

            const { data } = await tesloApi.post<LoginResponse>('/auth/login', { email, password })
            return data

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
                throw error.response?.data
            } else {
                throw new Error('Unable to Login')
            }
        }
    }

    static checkStatus = async (): Promise<LoginResponse> => {
        try {

            const { data } = await tesloApi.get<LoginResponse>('/auth/check-stauts');
            return data;

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw error.response?.data;
            } else {
                throw new Error('Unauthorized');
            }
        }
    }
}