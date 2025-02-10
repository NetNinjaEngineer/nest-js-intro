export interface UpdateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    gender?: string;
    age?: number;
    phone?: string;
    location?: string;
    bio?: string;
}