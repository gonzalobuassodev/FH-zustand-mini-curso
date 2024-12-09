import { create, StateCreator } from "zustand";
import { User } from "../../interfaces/user.interface";
import { AuthStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { AuthService } from '../../sercices/auth.service';

interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    loginUser: (email: string, password: string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logoutUser: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'pending',
    token: undefined,
    user: undefined,

    loginUser: async (email: string, password: string) => {


        try {

            const { token, ...user } = await AuthService.login(email, password);

            set({
                status: 'authorized',
                token,
                user
            })

        } catch (error) {
            set({
                status: 'unauthorized',
                token: undefined,
                user: undefined
            })
            throw 'Unauthorized';
        }

    },


    checkAuthStatus: async () => {
        try {
            const { token, ...user}  = await AuthService.checkStatus();

            set({ status: 'authorized', token, user});

        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined})
            throw 'Unauthorized';
        }
    },



    logoutUser: async () => {

        set({
            status: 'unauthorized',
            token: undefined,
            user: undefined
        })
    }


})

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi, {
                name: 'auth-storage'
            }
        )
    )
)