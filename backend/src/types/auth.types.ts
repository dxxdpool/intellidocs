export interface RegisterUserData {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export interface JwtPayload {
    sub: string;
}