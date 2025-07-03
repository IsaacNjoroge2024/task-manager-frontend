import React from 'react';
import { TaskFilters as ITaskFilters, TaskStatus, TaskPriority } from '@/types/task';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { debounce } from '@/utils/helpers';

interface TaskFiltersProps {
    filters: ITaskFilters;
    onFiltersChange: (filters: Partial<ITaskFilters>) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
                                                            filters,
                                                            onFiltersChange,
                                                        }) => {
    const { projects } = useProjects();

    const debouncedSearch = debounce((search: string) => {
        onFiltersChange({ search });
    }, 300);

    const handleClearFilters = () => {
        onFiltersChange({
            status: undefined,
            priority: undefined,
            assigneeId: undefined,
            projectId: undefined,
            search: '',
        });
    };

    const hasActiveFilters =
        filters.status ||
        filters.priority ||
        filters.assigneeId ||
        filters.projectId ||
        filters.search;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                {hasActiveFilters && (
                    <Button
                        onClick={handleClearFilters}
                        variant="outline"
                        size="sm"
                    >
                        Clear Filters
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                    placeholder="Search tasks..."
                    defaultValue={filters.search || ''}
                    onChange={(e) => debouncedSearch(e.target.value)}
                />

                <div>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => onFiltersChange({
                            status: e.target.value ? e.target.value as TaskStatus : undefined
                        })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value={TaskStatus.TODO}>To Do</option>
                        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                        <option value={TaskStatus.DONE}>Done</option>
                        <option value={TaskStatus.BLOCKED}>Blocked</option>
                    </select>
                </div>

                <div>
                    <select
                        value={filters.priority || ''}
                        onChange={(e) => onFiltersChange({
                            priority: e.target.value ? e.target.value as TaskPriority : undefined
                        })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                        <option value="">All Priorities</option>
                        <option value={TaskPriority.LOW}>Low</option>
                        <option value={TaskPriority.MEDIUM}>Medium</option>
                        <option value={TaskPriority.HIGH}>High</option>
                        <option value={TaskPriority.URGENT}>Urgent</option>
                    </select>
                </div>

                <div>
                    <select
                        value={filters.projectId || ''}
                        onChange={(e) => onFiltersChange({
                            projectId: e.target.value ? Number(e.target.value) : undefined
                        })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                        <option value="">All Projects</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};