import React, { useState } from 'react';
import { Project } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { ProjectForm } from './ProjectForm';
import { formatDate, truncateText, getInitials } from '@/utils/helpers';
import {
    CalendarIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { deleteProject } = useProjects();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project? This will also delete all associated tasks.')) {
            setIsDeleting(true);
            try {
                await deleteProject(project.id);
            } catch (error) {
                setIsDeleting(false);
            }
        }
    };

    return (
        <>
            <Card className="hover:shadow-md transition-shadow duration-200">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg text-gray-900">
                            {project.name}
                        </h3>
                        <div className="flex space-x-1 ml-2">
                            <Button
                                onClick={() => setIsEditModalOpen(true)}
                                variant="ghost"
                                size="sm"
                                className="p-1"
                            >
                                <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={handleDelete}
                                variant="ghost"
                                size="sm"
                                className="p-1 text-red-600 hover:text-red-700"
                                loading={isDeleting}
                            >
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {project.description && (
                        <p className="text-gray-600">
                            {truncateText(project.description, 150)}
                        </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center text-xs text-white mr-2">
                                {getInitials(project.ownerName)}
                            </div>
                            <span>Owner: {project.ownerName}</span>
                        </div>

                        <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <span>Created: {formatDate(project.createdAt)}</span>
                        </div>

                        {project.updatedAt !== project.createdAt && (
                            <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                <span>Updated: {formatDate(project.updatedAt)}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
            }`}>
              {project.active ? 'Active' : 'Inactive'}
            </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                // Navigate to project tasks view
                                // This would be implemented with React Router
                                console.log('Navigate to project tasks:', project.id);
                            }}
                        >
                            View Tasks
                        </Button>
                    </div>
                </div>
            </Card>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Project"
                size="lg"
            >
                <ProjectForm
                    project={project}
                    onSuccess={() => setIsEditModalOpen(false)}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            </Modal>
        </>
    );
};