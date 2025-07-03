import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSchema, LoginFormData } from '@/utils/validations';

export const LoginForm: React.FC = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
            navigate(from, { replace: true });
        } catch (error) {
            // Error is handled by the auth store and displayed via toast
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link
                            to="/login"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Username"
                            type="text"
                            autoComplete="username"
                            {...register('username')}
                            error={errors.username?.message}
                        />

                        <Input
                            label="Email"
                            type="email"
                            autoComplete="email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            {...register('password')}
                            error={errors.password?.message}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                type="text"
                                autoComplete="given-name"
                            />

                            <Input
                                label="Last Name"
                                type="text"
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        loading={isLoading}
                        className="w-full"
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
};