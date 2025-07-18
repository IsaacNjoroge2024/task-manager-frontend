export interface ApiError {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    validationErrors?: Record<string, string>;
}

export interface PaginationParams {
    page?: number;
    size?: number;
}