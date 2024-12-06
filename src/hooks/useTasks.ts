import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
    status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {

    const [onDragOver, setOnDragOver] = useState(false);

    const isDragging = useTaskStore((state) => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore((state) => state.onTaskDrop);

    const addTask = useTaskStore((state) => state.addTask);

    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
            title: 'Nueva tarea',
            input: 'text',
            inputLabel: 'Titulo',
            inputPlaceholder: 'Ingrese el nombre de la tarea',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe de ingresar el titulo'
                }
            }
        });

        if (!isConfirmed) return;

        addTask(value, status);
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(true);
        // console.log('handleDragOver');
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
        // console.log('handleDragLeave', status);
    };

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status);
    };


    return {
        onDragOver,
        isDragging,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleOnDrop,
    }
}
