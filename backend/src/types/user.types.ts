export interface CreateUserData {
    email: string;
    passwordHash: string;
    name: string;
}

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}