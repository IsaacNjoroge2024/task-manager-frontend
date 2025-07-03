import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TaskStatus, TaskPriority } from '@/types/task';
import {
    ClipboardDocumentListIcon,
    FolderIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export const DashboardPage: React.FC = () => {
    const { tasks, isLoading: tasksLoading } = useTasks();
    const { projects, isLoading: projectsLoading } = useProjects();

    if (tasksLoading || projectsLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const stats = {
        totalTasks: tasks.length,
        todoTasks: tasks.filter(task => task.status === TaskStatus.TODO).length,
        inProgressTasks: tasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length,
        completedTasks: tasks.filter(task => task.status === TaskStatus.DONE).length,
        urgentTasks: tasks.filter(task => task.priority === TaskPriority.URGENT).length,
        totalProjects: projects.length,
        activeProjects: projects.filter(project => project.active).length,
    };

    const recentTasks = tasks
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your tasks.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <ClipboardDocumentListIcon className="h-8 w-8 text-primary-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalTasks}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <FolderIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Active Projects</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.activeProjects}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Completed</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.completedTasks}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Urgent Tasks</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.urgentTasks}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Task Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Task Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">To Do</span>
                            <Badge variant="default">{stats.todoTasks}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">In Progress</span>
                            <Badge variant="primary">{stats.inProgressTasks}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Completed</span>
                            <Badge variant="success">{stats.completedTasks}</Badge>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Tasks</h3>
                    <div className="space-y-3">
                        {recentTasks.length === 0 ? (
                            <p className="text-gray-500 text-sm">No tasks yet</p>
                        ) : (
                            recentTasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {task.title}
                                        </p>
                                        <p className="text-sm text-gray-500">{task.projectName}</p>
                                    </div>
                                    <Badge
                                        variant={
                                            task.status === TaskStatus.DONE
                                                ? 'success'
                                                : task.status === TaskStatus.IN_PROGRESS
                                                    ? 'primary'
                                                    : 'default'
                                        }
                                    >
                                        {task.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};