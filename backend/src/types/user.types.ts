export interface CreateUserData {
    email: string;
    passwordHash: string;
    name: string;
}

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}