import { StateCreator } from "zustand";

export interface DateSlice {
    eventDate: number;

    eventYYYYMMDD: () => string;

    eventHHMM: () => string;

    setEventDate: (date: string) => void;

    setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
    eventDate: new Date().getTime(),
    
    eventYYYYMMDD: () => {

        const date = new Date(get().eventDate); 
        return date.toISOString().split('T')[0];

    },

    eventHHMM: () => {

        const date = new Date(get().eventDate);

        const newTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

        return newTime;


    },


    setEventDate: (parcialDate: string) => {

        const date = new Date(parcialDate)

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const newDate = new Date(get().eventDate);
        newDate.setFullYear(year);
        newDate.setMonth(month);
        newDate.setDate(day)

        set({
            eventDate: newDate.getTime(),
        });

        // return { eventDate: newDate}
    },


    setEventTime: (eventTime: string) => {

        const date = new Date(get().eventDate);

        date.setHours(+eventTime.split(':')[0], +eventTime.split(':')[1]);

        set({
            eventDate: date.getTime(),
        })
    }

})