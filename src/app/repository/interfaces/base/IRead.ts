import IQueryOptions from './IQueryOptions';

export default interface Read<T> {
    retrieve: (queryOptions?: IQueryOptions) => Promise<T[]>;
    findById: (id: string) => Promise<T>;
    findOne: (condition: any) => Promise<T>;
} 
