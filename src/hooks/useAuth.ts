import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { websocketService } from '@/services/websocketService';

export const useAuth = () => {
    const { user, token, isAuthenticated, isLoading, login, register, logout } = useAuthStore();

    useEffect(() => {
        if (token && isAuthenticated) {
            // Connect to WebSocket when authenticated
            websocketService.connect(token).catch(console.error);
        }

        return () => {
            // Disconnect WebSocket on cleanup
            websocketService.disconnect();
        };
    }, [token, isAuthenticated]);

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
    };
};