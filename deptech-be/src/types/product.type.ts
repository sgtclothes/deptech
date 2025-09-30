export interface ProductModel {
    id: string;
    categoryId: string;
    name: string;
    image?: string;
    description?: string;
    stock: number;
    data?: any;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

