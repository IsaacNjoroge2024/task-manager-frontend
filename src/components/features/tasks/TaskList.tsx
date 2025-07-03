import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import { TaskForm } from './TaskForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Modal } from '@/components/ui/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';

export const TaskList: React.FC = () => {
    const {
        tasks,
        isLoading,
        error,
        pagination,
        fetchTasks,
        filters,
        setFilters,
    } = useTasks();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handlePageChange = (page: number) => {
        fetchTasks(page);
    };

    if (isLoading && tasks.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    Create Task
                </Button>
            </div>

            <Card>
                <TaskFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                />
            </Card>

            {error && (
                <Card>
                    <div className="text-center py-8">
                        <p className="text-red-600">Error loading tasks: {error}</p>
                        <Button
                            onClick={() => fetchTasks()}
                            variant="outline"
                            className="mt-4"
                        >
                            Retry
                        </Button>
                    </div>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>

            {tasks.length === 0 && !isLoading && !error && (
                <Card>
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No tasks found</p>
                        <p className="text-gray-400 mt-2">Create your first task to get started</p>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mt-4"
                        >
                            Create Task
                        </Button>
                    </div>
                </Card>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <Card>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                            Showing {pagination.currentPage * pagination.size + 1} to{' '}
                            {Math.min((pagination.currentPage + 1) * pagination.size, pagination.totalElements)} of{' '}
                            {pagination.totalElements} results
                        </p>
                        <div className="flex space-x-2">
                            <Button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={pagination.currentPage === 0}
                                variant="outline"
                                size="sm"
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={pagination.currentPage === pagination.totalPages - 1}
                                variant="outline"
                                size="sm"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Task"
                size="lg"
            >
                <TaskForm
                    onSuccess={() => setIsCreateModalOpen(false)}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </Modal>
        </div>
    );
};