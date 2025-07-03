import api from './api';
import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';

export const projectService = {
    async getProjects(): Promise<Project[]> {
        const response = await api.get('/projects');
        return response.data;
    },

    async getProject(id: number): Promise<Project> {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    async createProject(data: CreateProjectData): Promise<Project> {
        const response = await api.post('/projects', data);
        return response.data;
    },

    async updateProject(id: number, data: UpdateProjectData): Promise<Project> {
        const response = await api.put(`/projects/${id}`, data);
        return response.data;
    },

    async deleteProject(id: number): Promise<void> {
        await api.delete(`/projects/${id}`);
    },
};