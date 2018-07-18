export default interface Read<T> {
    retrieve: (contition?: any, allback?: (error: any, result: any) => void) => Promise<T[]>;
    retrieveMany: (limit: number, page: number, callback?: (error: any, result: T[]) => void) => Promise<T[]>;
    findById: (id: string, callback?: (error: any, result: T) => void) => Promise<T>;
    findOne: (condition: any, callback?: (error: any, result: T) => void) => Promise<T>;
} 
