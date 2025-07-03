import { useEffect } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { websocketService } from '@/services/websocketService';

export const useTasks = () => {
    const {
        tasks,
        selectedTask,
        filters,
        pagination,
        isLoading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setSelectedTask,
        setFilters,
        updateTaskStatus,
        handleTaskUpdate,
        handleTaskDelete,
    } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    useEffect(() => {
        // Subscribe to WebSocket task updates
        websocketService.subscribe('/topic/tasks', (message) => {
            const { action, task, taskId } = message;

            switch (action) {
                case 'CREATE':
                case 'UPDATE':
                    handleTaskUpdate(task);
                    break;
                case 'DELETE':
                    handleTaskDelete(taskId);
                    break;
            }
        });
    }, [handleTaskUpdate, handleTaskDelete]);

    return {
        tasks,
        selectedTask,
        filters,
        pagination,
        isLoading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setSelectedTask,
        setFilters,
        updateTaskStatus,
    };
};