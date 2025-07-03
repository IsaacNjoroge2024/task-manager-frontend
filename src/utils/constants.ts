export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    TASKS: '/tasks',
    PROJECTS: '/projects',
} as const;

export const TASK_STATUS_COLORS = {
    TODO: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    DONE: 'bg-green-100 text-green-800',
    BLOCKED: 'bg-red-100 text-red-800',
} as const;

export const TASK_PRIORITY_COLORS = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
} as const;

export const LOCAL_STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
} as const;