export interface SetupPagination {
    limit?: number;
    offset?: number;
    attributes?: any;
    where?: object;
    order?: string[][];
    include?: object[];
    group?: string[];
}

export abstract class AbstractRESTService {
    abstract getAll(params: any): Promise<void>;
    abstract getOne(id: string, params: any): Promise<void>;
    abstract create(data: any, params: any): Promise<void>;
    abstract update(id: string, data: any): Promise<void>;
    abstract delete(id: string): Promise<{ message: string }>;
}
