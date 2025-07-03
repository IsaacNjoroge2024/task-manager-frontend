export interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    enabled: boolean;
    createdAt: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginResponse {
    token: string;
    userId: number;
    username: string;
    email: string;
    role: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}