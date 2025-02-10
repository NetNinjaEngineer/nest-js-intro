export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    gender?: string;
    age?: number;
    phone?: string;
    location?: string;
    bio?: string;
    isMarried?: boolean;
}