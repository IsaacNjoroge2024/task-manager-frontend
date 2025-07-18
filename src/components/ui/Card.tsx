import React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
                                              children,
                                              className,
                                              padding = 'md',
                                          }) => {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={cn(
                'bg-white rounded-lg shadow-sm border border-gray-200',
                paddingClasses[padding],
                className
            )}
        >
            {children}
        </div>
    );
};