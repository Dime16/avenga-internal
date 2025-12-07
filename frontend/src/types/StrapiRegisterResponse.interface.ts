export interface StrapiRegisterResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
        confirmed: boolean;
        blocked: boolean;
    };
}