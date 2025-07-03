import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { TaskList } from '@/components/features/tasks/TaskList';

export const TasksPage: React.FC = () => {
    return (
        <Layout>
            <TaskList />
        </Layout>
    );
};