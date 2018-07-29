export default  interface Write<T> {
    create: (item: T) => Promise<T>;
    createMany: (items: Array<T>) => Promise<Array<T>>;
    update: (_id: string, item: T) => Promise<T> ;
    delete: (_id: string) => Promise<void>;
}
