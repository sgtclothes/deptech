export interface CategoryModel {
    id: string;
    name: string;
    description?: string;
    data?: any;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
