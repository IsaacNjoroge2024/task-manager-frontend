import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { projectSchema, ProjectFormData } from '@/utils/validations';

interface ProjectFormProps {
    project?: Project;
    onSuccess: () => void;
    onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
                                                            project,
                                                            onSuccess,
                                                            onCancel,
                                                        }) => {
    const { createProject, updateProject } = useProjects();
    const isEditing = !!project;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: project
            ? {
                name: project.name,
                description: project.description || '',
            }
            : {},
    });

    const onSubmit = async (data: ProjectFormData) => {
        try {
            if (isEditing) {
                await updateProject(project.id, data);
            } else {
                await createProject(data);
            }
            onSuccess();
        } catch (error) {
            // Error handled by store
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Project Name"
                {...register('name')}
                error={errors.name?.message}
                placeholder="Enter project name"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    {...register('description')}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter project description (optional)"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    loading={isSubmitting}
                >
                    {isEditing ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
};