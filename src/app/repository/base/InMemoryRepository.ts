import IRepository from '../interfaces/IRepository';
import { injectable, unmanaged } from 'inversify';
import IModel from '../../model/interfaces/IModel';
import * as uuid from 'uuid/v1';


@injectable()
export default class InMemoryRepository<T extends IModel> implements IRepository<T> {
    
    private rawData: T[];

    /**
     *
     */
    constructor(@unmanaged() rawInitialData?: T[]) {
        this.rawData = rawInitialData || [];

        this.rawData.forEach(element => {
            if (!element._id)
                element._id = this.generateId();
        });
    }

    protected get items(): T[] {
        return this.rawData;
    }

    public create(item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return new Promise<T>((resolve) => {
            item._id = this.generateId();
            this.rawData.push(item);
            if (callback)
                callback(null, item);
            resolve(item);
        });

    }

    public retrieve(callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return new Promise<T[]>((resolve) => {
            if (callback)
                callback(null, this.items);
            resolve(this.items);
        });
    }

    public update(id: string, item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return null;
    }

    public delete(id: string, callback?: (error: any) => void): Promise<void> {
        return null;
    }

    public findById(id: string, callback?: (error: any, result: T) => void): Promise<T> {
        return null;
    }

    public findOne(condition: any, callback?: (error: any, result: T) => void): Promise<T> {
        return null;
    }

    protected generateId(): any {
        // return mongoose.Types.ObjectId.createFromHexString(id);

        return uuid();
    }

}
