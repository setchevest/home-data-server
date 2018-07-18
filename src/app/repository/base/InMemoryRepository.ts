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

    public async create(item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return new Promise<T>((resolve) => {
            item._id = this.generateId();
            this.rawData.push(item);
            if (callback)
                callback(null, item);
            resolve(item);
        });

    }

    public async createMany(items: Array<T>, callback?: (error: any, result: Array<T>) => void): Promise<Array<T>> {
        return new Promise<Array<T>>(resolve => {
            items.forEach(item => {
                item._id = this.generateId();
                this.rawData.push(item);
            });
            if (callback)
                callback(null, items);
                
            resolve(items);
        });
    }

    public async retrieve(callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return new Promise<T[]>((resolve) => {
            if (callback)
                callback(null, this.items);
            resolve(this.items);
        });
    }

    public async retrieveMany(limit: number, page: number, callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return new Promise<T[]>((resolve) => {

            limit = Math.abs(limit || 50);
            page = Math.abs(page || 0);

            if (callback)
                callback(null, this.items.slice(page, limit));

            resolve(this.items.slice(page * limit, limit));
        });
    }

    public async update(id: string, item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return new Promise<T>((resolve, rejec) => {
            let updateItem = this.items.find(aitem => aitem._id === id);
            if (!updateItem) {
                rejec('Item not found!');
            } else {
                // TODO: Copy all data;
                updateItem = item;
                resolve(updateItem);
            }
        });
    }

    public async delete(id: string, callback?: (error: any) => void): Promise<void> {
        return new Promise<void>((resolve) => {
            const index = this.items.findIndex(item => item._id === id);
            if (index > -1) {
                this.items.splice(index, 1);
            }
            resolve();
        });
    }

    public findById(id: string, callback?: (error: any, result: T) => void): Promise<T> {
        return new Promise<T>((resolve) => {
            resolve(this.items.find(item => item._id === id));
        });
    }

    public findOne(condition: any, callback?: (error: any, result: T) => void): Promise<T> {
        return new Promise<T>((resolve) => {
            resolve(this.items.find(condition));
        });
    }

    protected generateId(): any {
        // return mongoose.Types.ObjectId.createFromHexString(id);

        return uuid();
    }

}
