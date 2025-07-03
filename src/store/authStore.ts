import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData, AuthState } from '@/types/auth';
import { authService } from '@/services/authService';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import toast from 'react-hot-toast';

interface AuthStore extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (credentials) => {
                set({ isLoading: true });
                try {
                    const response = await authService.login(credentials);
                    const user: User = {
                        id: response.userId,
                        username: response.username,
                        email: response.email,
                        role: response.role,
                        enabled: true,
                        createdAt: new Date().toISOString(),
                    };

                    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
                    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(user));

                    set({
                        user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });

                    toast.success('Login successful!');
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            register: async (data) => {
                set({ isLoading: true });
                try {
                    await authService.register(data);
                    set({ isLoading: false });
                    toast.success('Registration successful! Please login.');
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                authService.logout();
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
                toast.success('Logged out successfully');
            },

            updateUser: (userData) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                }));
            },

            clearError: () => {
                // Error handling is done via toast notifications
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);