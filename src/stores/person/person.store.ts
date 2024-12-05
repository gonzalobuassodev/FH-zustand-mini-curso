import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
    firstName: string;
    lastName: string;
}

interface PersonActions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<PersonState & PersonActions, [["zustand/devtools", unknown]]> = (set) => ({

    firstName: '',
    lastName: '',

    setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),

})



export const usePersonStore = create<PersonState & PersonActions>()(

    devtools(

        persist(
            storeApi,
            {
                name: 'person-storage',
                storage: firebaseStorage
            })
    )

);