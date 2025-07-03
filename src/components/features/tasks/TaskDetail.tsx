import React from 'react';
import { Task } from '@/types/task';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatDateTime, getInitials } from '@/utils/helpers';
import {
    CalendarIcon,
    ClockIcon,
    UserIcon,
    FolderIcon,
} from '@heroicons/react/24/outline';

interface TaskDetailProps {
    task: Task;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'TODO':
                return 'default';
            case 'IN_PROGRESS':
                return 'primary';
            case 'DONE':
                return 'success';
            case 'BLOCKED':
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
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {task.title}
                </h2>

                <div className="flex items-center space-x-2 mb-4">
                    <Badge variant={getStatusVariant(task.status)}>
                        {task.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant={getPriorityVariant(task.priority)}>
                        {task.priority}
                    </Badge>
                    {task.categoryName && (
                        <Badge variant="default">
                            {task.categoryName}
                        </Badge>
                    )}
                </div>

                {task.description && (
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700 border-b pb-2">
                        Task Information
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-center">
                            <FolderIcon className="w-4 h-4 mr-3 text-gray-400" />
                            <span className="text-sm">
                                <span className="font-medium">Project:</span> {task.projectName}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-3 text-gray-400" />
                            <span className="text-sm">
                                <span className="font-medium">Reporter:</span> {task.reporterName}
                            </span>
                        </div>

                        {task.assigneeName && (
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center text-xs text-white mr-3">
                                    {getInitials(task.assigneeName)}
                                </div>
                                <span className="text-sm">
                                    <span className="font-medium">Assignee:</span> {task.assigneeName}
                                </span>
                            </div>
                        )}

                        {task.dueDate && (
                            <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-3 text-gray-400" />
                                <span className="text-sm">
                                    <span className="font-medium">Due Date:</span> {formatDate(task.dueDate)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700 border-b pb-2">
                        Time Tracking
                    </h3>

                    <div className="space-y-3">
                        {task.estimatedHours && (
                            <div className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-3 text-gray-400" />
                                <span className="text-sm">
                                    <span className="font-medium">Estimated:</span> {task.estimatedHours}h
                                </span>
                            </div>
                        )}

                        {task.actualHours && (
                            <div className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-3 text-gray-400" />
                                <span className="text-sm">
                                    <span className="font-medium">Actual:</span> {task.actualHours}h
                                </span>
                            </div>
                        )}

                        <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-3 text-gray-400" />
                            <span className="text-sm">
                                <span className="font-medium">Created:</span> {formatDateTime(task.createdAt)}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-3 text-gray-400" />
                            <span className="text-sm">
                                <span className="font-medium">Updated:</span> {formatDateTime(task.updatedAt)}
                            </span>
                        </div>

                        {task.completedAt && (
                            <div className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-3 text-gray-400" />
                                <span className="text-sm">
                                    <span className="font-medium">Completed:</span> {formatDateTime(task.completedAt)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};