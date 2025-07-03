export interface Project {
    id: number;
    name: string;
    description?: string;
    ownerId: number;
    ownerName: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectData {
    name: string;
    description?: string;
}

export interface UpdateProjectData {
    name?: string;
    description?: string;
}