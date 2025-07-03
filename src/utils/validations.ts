import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must be less than 50 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(500, 'Title is too long'),
    description: z.string().optional(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
    projectId: z.number().min(1, 'Project is required'),
    assigneeId: z.number().optional(),
    categoryId: z.number().optional(),
    dueDate: z.string().optional(),
    estimatedHours: z.number().min(0).optional(),
});

export const projectSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
    description: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;