export interface TransactionModel {
    id: string;
    type: string;
    data?: any;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface DetailTransactionModel {
    id: string;
    transactionId: string;
    productId: string;
    stock: number;
    data?: any;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}