export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    BLOCKED = 'BLOCKED'
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    projectId: number;
    projectName: string;
    assigneeId?: number;
    assigneeName?: string;
    reporterId: number;
    reporterName: string;
    categoryId?: number;
    categoryName?: string;
    dueDate?: string;
    estimatedHours?: number;
    actualHours?: number;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    projectId: number;
    assigneeId?: number;
    categoryId?: number;
    dueDate?: string;
    estimatedHours?: number;
}

export interface UpdateTaskData {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    assigneeId?: number;
    dueDate?: string;
    estimatedHours?: number;
    actualHours?: number;
}

export interface TaskFilters {
    status?: TaskStatus;
    priority?: TaskPriority;
    assigneeId?: number;
    projectId?: number;
    search?: string;
}

export interface TasksResponse {
    content: Task[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}