export default  interface Write<T> {
    create: (item: T, callback?: (error: any, result: any ) => void) => Promise<T>;
    createMany: (items: Array<T>, callback?: (error: any, result: any ) => void) => Promise<Array<T>>;
    update: (_id: string, item: T, callback?: (error: any, result: any) => void) => Promise<T> ;
    delete: (_id: string, callback?: (error: any) => void) => Promise<void>;
}
