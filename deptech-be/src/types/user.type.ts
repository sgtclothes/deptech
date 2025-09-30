export interface UserModel {
    id: string;
    firstname: string;
    lastname: string;
    birthDate: Date;
    role: string;
    gender: string;
    data: any;
    email: string;
    password: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
