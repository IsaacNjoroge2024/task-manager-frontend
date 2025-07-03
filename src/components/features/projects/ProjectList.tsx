import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import { ProjectForm } from './ProjectForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Modal } from '@/components/ui/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';

export const ProjectList: React.FC = () => {
    const { projects, isLoading, error, fetchProjects } = useProjects();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    Create Project
                </Button>
            </div>

            {error && (
                <Card>
                    <div className="text-center py-8">
                        <p className="text-red-600">Error loading projects: {error}</p>
                        <Button
                            onClick={fetchProjects}
                            variant="outline"
                            className="mt-4"
                        >
                            Retry
                        </Button>
                    </div>
                </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {projects.length === 0 && !isLoading && !error && (
                <Card>
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No projects found</p>
                        <p className="text-gray-400 mt-2">Create your first project to get started</p>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mt-4"
                        >
                            Create Project
                        </Button>
                    </div>
                </Card>
            )}

            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Project"
                size="lg"
            >
                <ProjectForm
                    onSuccess={() => setIsCreateModalOpen(false)}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </Modal>
        </div>
    );
};