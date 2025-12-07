export interface RegisterUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    yearOfBirth: string;
    gender: string;
    zipCode: string;
    country: string;
    state: string;
    loginCount?: number;
}


export interface RegisterFormProps {
    onSubmit: (data: RegisterUserInput) => void;
    error?: string;
}
