import React, { useState } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from './TaskForm';
import { TaskDetail } from './TaskDetail';
import { formatDate, truncateText, getInitials } from '@/utils/helpers';
import {
    CalendarIcon,
    ClockIcon,
    UserIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { updateTaskStatus, deleteTask } = useTasks();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleStatusChange = async (newStatus: TaskStatus) => {
        try {
            await updateTaskStatus(task.id, newStatus);
        } catch (error) {
            // Error handled by store
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setIsDeleting(true);
            try {
                await deleteTask(task.id);
            } catch (error) {
                setIsDeleting(false);
            }
        }
    };

    const getStatusVariant = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.TODO:
                return 'default';
            case TaskStatus.IN_PROGRESS:
                return 'primary';
            case TaskStatus.DONE:
                return 'success';
            case TaskStatus.BLOCKED:
                return 'danger';
            default:
                return 'default';
        }
    };

    const getPriorityVariant = (priority: string) => {
        switch (priority) {
            case 'LOW':
                return 'default';
            case 'MEDIUM':
                return 'warning';
            case 'HIGH':
                return 'danger';
            case 'URGENT':
                return 'danger';
            default:
                return 'default';
        }
    };

    return (
        <>
            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div
                    onClick={() => setIsDetailModalOpen(true)}
                    className="space-y-4"
                >
                    <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                            {task.title}
                        </h3>
                        <div className="flex space-x-1 ml-2">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditModalOpen(true);
                                }}
                                variant="ghost"
                                size="sm"
                                className="p-1"
                            >
                                <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                                variant="ghost"
                                size="sm"
                                className="p-1 text-red-600 hover:text-red-700"
                                loading={isDeleting}
                            >
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {task.description && (
                        <p className="text-gray-600 text-sm">
                            {truncateText(task.description, 100)}
                        </p>
                    )}

                    <div className="flex items-center space-x-2">
                        <Badge variant={getStatusVariant(task.status)}>
                            {task.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant={getPriorityVariant(task.priority)}>
                            {task.priority}
                        </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-2" />
                            <span>Project: {task.projectName}</span>
                        </div>

                        {task.assigneeName && (
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-xs mr-2">
                                    {getInitials(task.assigneeName)}
                                </div>
                                <span>Assigned to: {task.assigneeName}</span>
                            </div>
                        )}

                        {task.dueDate && (
                            <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                <span>Due: {formatDate(task.dueDate)}</span>
                            </div>
                        )}

                        <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            <span>Created: {formatDate(task.createdAt)}</span>
                        </div>
                    </div>

                    {/* Status Change Buttons */}
                    <div className="flex space-x-2 pt-2 border-t">
                        {task.status !== TaskStatus.TODO && (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(TaskStatus.TODO);
                                }}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                To Do
                            </Button>
                        )}
                        {task.status !== TaskStatus.IN_PROGRESS && (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(TaskStatus.IN_PROGRESS);
                                }}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                In Progress
                            </Button>
                        )}
                        {task.status !== TaskStatus.DONE && (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(TaskStatus.DONE);
                                }}
                                variant="primary"
                                size="sm"
                                className="flex-1"
                            >
                                Done
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="Task Details"
                size="lg"
            >
                <TaskDetail task={task} />
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Task"
                size="lg"
            >
                <TaskForm
                    task={task}
                    onSuccess={() => setIsEditModalOpen(false)}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            </Modal>
        </>
    );
};