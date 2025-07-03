import api from './api';
import { Task, CreateTaskData, UpdateTaskData, TaskFilters, TasksResponse } from '@/types/task';
import { PaginationParams } from '@/types/api';

export const taskService = {
    async getTasks(
        filters: TaskFilters = {},
        pagination: PaginationParams = {}
    ): Promise<TasksResponse> {
        const params = new URLSearchParams();

        if (pagination.page !== undefined) params.append('page', pagination.page.toString());
        if (pagination.size !== undefined) params.append('size', pagination.size.toString());
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.assigneeId) params.append('assigneeId', filters.assigneeId.toString());
        if (filters.projectId) params.append('projectId', filters.projectId.toString());

        const response = await api.get(`/tasks?${params.toString()}`);
        return response.data;
    },

    async getTask(id: number): Promise<Task> {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    async createTask(data: CreateTaskData): Promise<Task> {
        const response = await api.post('/tasks', data);
        return response.data;
    },

    async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
        const response = await api.put(`/tasks/${id}`, data);
        return response.data;
    },

    async deleteTask(id: number): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },

    async updateTaskStatus(id: number, status: string): Promise<Task> {
        const response = await api.patch(`/tasks/${id}/status?status=${status}`);
        return response.data;
    },
};