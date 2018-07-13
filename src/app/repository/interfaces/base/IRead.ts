export default interface Read<T> {
    retrieve: (callback?: (error: any, result: any) => void) => Promise<T[]>;
    findById: (id: string, callback?: (error: any, result: T) => void) => Promise<T>;
    findOne: (condition: any, callback?: (error: any, result: T) => void) => Promise<T>;
} 
