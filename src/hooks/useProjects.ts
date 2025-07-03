import { useEffect } from 'react';
import { useProjectStore } from '@/store/projectStore';

export const useProjects = () => {
    const {
        projects,
        selectedProject,
        isLoading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        setSelectedProject,
    } = useProjectStore();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        selectedProject,
        isLoading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        setSelectedProject,
    };
};