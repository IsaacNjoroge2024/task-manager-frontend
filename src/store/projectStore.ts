import { create } from 'zustand';
import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';
import { projectService } from '@/services/projectService';
import toast from 'react-hot-toast';

interface ProjectStore {
    projects: Project[];
    selectedProject: Project | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProjects: () => Promise<void>;
    createProject: (data: CreateProjectData) => Promise<void>;
    updateProject: (id: number, data: UpdateProjectData) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
    setSelectedProject: (project: Project | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    selectedProject: null,
    isLoading: false,
    error: null,

    fetchProjects: async () => {
        set({ isLoading: true, error: null });
        try {
            const projects = await projectService.getProjects();
            set({ projects, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    createProject: async (data) => {
        try {
            const newProject = await projectService.createProject(data);
            set((state) => ({ projects: [...state.projects, newProject] }));
            toast.success('Project created successfully!');
        } catch (error) {
            set({ error: (error as Error).message });
            throw error;
        }
    },

    updateProject: async (id, data) => {
        try {
            const updatedProject = await projectService.updateProject(id, data);
            set((state) => ({
                projects: state.projects.map((project) =>
                    project.id === id ? updatedProject : project
                ),
                selectedProject: state.selectedProject?.id === id ? updatedProject : state.selectedProject,
            }));
            toast.success('Project updated successfully!');
        } catch (error) {
            set({ error: (error as Error).message });
            throw error;
        }
    },

    deleteProject: async (id) => {
        try {
            await projectService.deleteProject(id);
            set((state) => ({
                projects: state.projects.filter((project) => project.id !== id),
                selectedProject: state.selectedProject?.id === id ? null : state.selectedProject,
            }));
            toast.success('Project deleted successfully!');
        } catch (error) {
            set({ error: (error as Error).message });
            throw error;
        }
    },

    setSelectedProject: (project) => set({ selectedProject: project }),
}));