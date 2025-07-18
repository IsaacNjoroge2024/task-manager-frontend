import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProjectList } from '@/components/features/projects/ProjectList';

export const ProjectsPage: React.FC = () => {
    return (
        <Layout>
            <ProjectList />
        </Layout>
    );
};