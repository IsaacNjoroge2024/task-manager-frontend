import api from './api';
import { LoginCredentials, RegisterData, LoginResponse, User } from '@/types/auth';

export const authService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async register(data: RegisterData): Promise<User> {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    },
};