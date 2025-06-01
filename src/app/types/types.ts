// types/api.ts
export interface ActionResponse<T> {
    success: boolean;
    message: string;
    data?: T | null;
}

// types.ts

export type SimplifiedJob = {
    id: string;
    date: string; // ISO date string
    jobName: string;
    company: string;
    wage: string; // keeping string since pay is a range like "$800 - $6000"
    feesPaid: boolean;
    status: string;
};

export type User = {
    _id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    jobs: {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
        hasPaid: boolean;
        status: string;
        payment: null | string;
        user: string;
        job: {
            _id: string;
            company: string;
            title: string;
            description: string;
            type: string;
            experienceLevel: string;
            location: string;
            pay: string;
            processingFee: string;
            tags: string[];
            deadline: Date;
            createdAt: Date;
            updatedAt: Date;
            __v: number;
        };
        __v: number;
    }[];

    __v: number;
};


export type Company = {
    _id: string;
    name: string;
    logo: string;
    about?: string
};

export type Job = {
    _id: string;
    title: string;
    pay: string;
    description: string;
    type: 'remote' | 'onsite' | 'hybrid';
    location: string;
    company: Company;
    experienceLevel: 'internship' | 'mid' | 'senior' | 'lead';
    tags: string[];
    deadline?: string;
    createdAt: string;
    processingFee?: string;
};

export type PaginatedJobs = {
    jobs: Job[];
    total: number;
    currentPage: number;
    totalPages: number;
};
