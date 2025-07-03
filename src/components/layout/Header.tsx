import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { getInitials } from '@/utils/helpers';

export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900">
                                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {getInitials(user?.username)}
                                </div>
                                <span className="font-medium">{user?.username}</span>
                                <ChevronDownIcon className="w-4 h-4" />
                            </Menu.Button>

                            <Transition
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? 'bg-gray-100' : ''
                                                    } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                                >
                                                    <UserCircleIcon className="w-4 h-4 mr-3" />
                                                    Profile
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={`${
                                                        active ? 'bg-gray-100' : ''
                                                    } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                                >
                                                    Logout
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
};