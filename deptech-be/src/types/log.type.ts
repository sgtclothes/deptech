export interface LogModel {
    id: string;
    userId: string;
    code: string;
    action: string;
    description: string;
    data: any;
    createdAt: string;
    updatedAt: string;
}

export abstract class AbstractWinstonService {
    abstract log(level: string, message: string): void;
}
