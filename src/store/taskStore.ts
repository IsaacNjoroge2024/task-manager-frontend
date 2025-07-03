import { create } from 'zustand';
import { Task, TaskFilters, CreateTaskData, UpdateTaskData} from '@/types/task';
import { taskService } from '@/services/taskService';
import toast from 'react-hot-toast';

interface TaskStore {
    tasks: Task[];
    selectedTask: Task | null;
    filters: TaskFilters;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalElements: number;
        size: number;
    };
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchTasks: (page?: number) => Promise<void>;
    createTask: (data: CreateTaskData) => Promise<void>;
    updateTask: (id: number, data: UpdateTaskData) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    setSelectedTask: (task: Task | null) => void;
    setFilters: (filters: Partial<TaskFilters>) => void;
    updateTaskStatus: (id: number, status: string) => Promise<void>;

    // Real-time updates
    handleTaskUpdate: (task: Task) => void;
    handleTaskDelete: (taskId: number) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    selectedTask: null,
    filters: {},
    pagination: {
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        size: 20,
    },
    isLoading: false,
    error: null,

    fetchTasks: async (page = 0) => {
        set({ isLoading: true, error: null });
        try {
            const response = await taskService.getTasks(get().filters, { page, size: get().pagination.size });
            set({
                tasks: response.content,
                pagination: {
                    currentPage: response.number,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    size: response.size,
                },
                isLoading: false,
            });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    createTask: async (data) => {
        try {
            const newTask = await taskService.createTask(data);
            set((state) => ({ tasks: [newTask, ...state.tasks] }));
            toast.success('Task created successfully!');
        } catch (error) {
            set({ error: (error as Error).message });
            throw error;
        }
    },

    updateTask: async (id, data) => {
        try {
            const updatedTask = await taskService.updateTask(id, data);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? updatedTask : task
                ),
                selectedTask: state.selectedTask?.id === id ? updatedTask : state.selectedTask,
            }));
            toast.success('Task updated successfully!');
        } catch (error) {
            set({ error: (error as Error).message });
            throw error;
        }
    },

    deleteTask: async (id) => {
        try {
            await taskService.deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
                selectedTask: state.selectedTask?.id === id ? null : state.selectedTask,
            }));
            toast.success('Task deleted successfully!');
        } catch (error) {
            set({ error: (error as Error).message });
            throw error;
        }
    },

    setSelectedTask: (task) => set({ selectedTask: task }),

    setFilters: (newFilters) => {
        set((state) => ({ filters: { ...state.filters, ...newFilters } }));
        get().fetchTasks(0); // Reset to first page when filters change
    },

    updateTaskStatus: async (id, status) => {
        try {
            const updatedTask = await taskService.updateTaskStatus(id, status);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? updatedTask : task
                ),
            }));
            toast.success('Task status updated!');
        } catch (error) {
            set({ error: (error as Error).message });
            throw error;
        }
    },

    // Real-time update handlers
    handleTaskUpdate: (updatedTask) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            ),
        }));
        toast.success('Task updated in real-time');
    },

    handleTaskDelete: (taskId) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
        toast.success('Task deleted');
    },
}));