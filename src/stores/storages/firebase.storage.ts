import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = 'https://zustand-storage-3b115-default-rtdb.europe-west1.firebasedatabase.app/zustand';

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {

        try {

            const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json());
            return JSON.stringify(data);

        } catch (error) {
            console.log(error);
            throw error;
        }

    },

    setItem: async function (name: string, value: string): Promise<void> {

        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`, {
                method: 'PUT',
                body: value,
            }).then(res => res.json());
            return;
        } catch (error) {
            console.log(error);
        }

    },
    removeItem: function (name: string): void {
        // console.log('removeItem', name)
        sessionStorage.removeItem(name);
    }
}

export const firebaseStorage = createJSONStorage(() => storageApi)