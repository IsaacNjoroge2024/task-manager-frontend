import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { taskSchema, TaskFormData } from '@/utils/validations';

interface TaskFormProps {
    task?: Task;
    onSuccess: () => void;
    onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
                                                      task,
                                                      onSuccess,
                                                      onCancel,
                                                  }) => {
    const { createTask, updateTask } = useTasks();
    const { projects } = useProjects();
    const isEditing = !!task;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: task
            ? {
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                projectId: task.projectId,
                assigneeId: task.assigneeId || undefined,
                dueDate: task.dueDate || '',
                estimatedHours: task.estimatedHours || undefined,
            }
            : {
                status: TaskStatus.TODO,
                priority: TaskPriority.MEDIUM,
            },
    });

    const onSubmit = async (data: TaskFormData) => {
        try {
            if (isEditing) {
                await updateTask(task.id, {
                    ...data,
                    status: data.status as TaskStatus | undefined,
                    priority: data.priority as TaskPriority | undefined,
                });
            } else {
                await createTask({
                    ...data,
                    status: data.status as TaskStatus | undefined,
                    priority: data.priority as TaskPriority | undefined,
                });
            }
            onSuccess();
        } catch (error) {
            // Error handled by store
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Title"
                {...register('title')}
                error={errors.title?.message}
                placeholder="Enter task title"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    {...register('description')}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter task description"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        {...register('status')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                        <option value={TaskStatus.TODO}>To Do</option>
                        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                        <option value={TaskStatus.DONE}>Done</option>
                        <option value={TaskStatus.BLOCKED}>Blocked</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <select
                        {...register('priority')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                        <option value={TaskPriority.LOW}>Low</option>
                        <option value={TaskPriority.MEDIUM}>Medium</option>
                        <option value={TaskPriority.HIGH}>High</option>
                        <option value={TaskPriority.URGENT}>Urgent</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project
                </label>
                <select
                    {...register('projectId', { valueAsNumber: true })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                {errors.projectId && (
                    <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Due Date"
                    type="date"
                    {...register('dueDate')}
                    error={errors.dueDate?.message}
                />

                <Input
                    label="Estimated Hours"
                    type="number"
                    step="0.5"
                    min="0"
                    {...register('estimatedHours', { valueAsNumber: true })}
                    error={errors.estimatedHours?.message}
                    placeholder="0"
                />
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
                    {isEditing ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
};