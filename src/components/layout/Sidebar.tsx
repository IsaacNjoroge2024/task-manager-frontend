import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/helpers';
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    FolderIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
    { name: 'Projects', href: '/projects', icon: FolderIcon },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon },
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
            <nav className="p-4">
                <ul className="space-y-2">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                                        isActive
                                            ? 'bg-primary-100 text-primary-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    )
                                }
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};