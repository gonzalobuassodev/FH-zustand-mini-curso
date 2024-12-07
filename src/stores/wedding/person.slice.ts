import { StateCreator } from "zustand";

export interface PersonSlice {
    firstName: string;
    lastName: string;

    setFirstName: (firstname: string) => void;
    setLastName: (lastname: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
    firstName: '',
    lastName: '',

    setFirstName: (firstName: string) => set({
        firstName
    }),


    setLastName: (lastName: string) => set({
        lastName
    })
})


