import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { ApiError } from '@/types/api';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth data and redirect to login
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // Show error toast
        const apiError: ApiError = error.response?.data || {
            message: 'An unexpected error occurred',
            status: 500,
            error: 'Internal Server Error',
            timestamp: new Date().toISOString(),
        };

        if (apiError.validationErrors) {
            // Handle validation errors
            Object.values(apiError.validationErrors).forEach(message => {
                toast.error(message);
            });
        } else {
            toast.error(apiError.message);
        }

        return Promise.reject(error);
    }
);

export default api;