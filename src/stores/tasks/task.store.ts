import { devtools, persist } from "zustand/middleware";
import { Task, TaskStatus } from "../../interfaces";
import { create, StateCreator } from 'zustand';
import { v4 as uuid } from 'uuid';
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

interface TaskState {

    draggingTaskId?: string;

    tasks: Record<string, Task>;

    getTaskByStatus: (status: TaskStatus) => Task[];

    setDraggingTaskId: (taskId: string) => void;

    removeDraggingTaskId: () => void;

    changeStatus: (taskId: string, status: TaskStatus) => void;

    onTaskDrop: (status: TaskStatus) => void;

    addTask: (title: string, status: TaskStatus) => void;

    getTotalTasks: () => number;
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never]]> = (set, get) => ({

    draggingTaskId: undefined,

    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task #1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task #2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task #3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task #4', status: 'open' },
    },


    getTaskByStatus: (status: TaskStatus) => {
        return Object.values(get().tasks).filter(task => task.status === status);
    },

    setDraggingTaskId: (draggingTaskId: string) => {
        set({ draggingTaskId })
    },

    removeDraggingTaskId: () => {
        set({ draggingTaskId: undefined })
    },

    changeStatus: (taskId: string, status: TaskStatus) => {

        const task = get().tasks[taskId];

        // Crea un nuevo objeto para la tarea con el nuevo estado
        const updatedTask = { ...task, status };

        // Actualiza el estado con la nueva tarea
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [taskId]: updatedTask, // Usa la nueva tarea aquí
        //     }
        // }));

        set((state) => {
            state.tasks[taskId] = updatedTask;
        })
    },

    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;

        if (!taskId) return;

        get().changeStatus(taskId, status);
        get().removeDraggingTaskId();
    },


    addTask: (title: string, status: TaskStatus) => {

        const newTask: Task = { id: uuid(), title, status };

        //! forma zustand immer
        set((state) => {
            state.tasks[newTask.id] = newTask;
        })


        //! forma nativa zustand
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [task.id]: newTask
        //     }
        // })); 

        //! forma immer
        // set(produce((state: TaskState) => {
        //     state.tasks[newTask.id] = newTask;
        // }))

    },

    getTotalTasks: () => {
        return Object.values(get().tasks).length;
    }

    // remove: (taskId: sttring) => {

    //     const task = get().tasks[taskId];

    //     set(produce((taskId: string) => {
    //         state.tasks = 
    //     }))
    // }

})


export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(storeApi)
            , {
                name: 'tasks-storage',
            }
        )
    )
);