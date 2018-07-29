import IRepository from '../interfaces/IRepository';
import { injectable, unmanaged } from 'inversify';
import IModel from '../../model/interfaces/IModel';
import * as uuid from 'uuid/v1';
import IQueryOptions from '../interfaces/base/IQueryOptions';


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

    public async create(item: T): Promise<T> {
        return new Promise<T>((resolve) => {
            item._id = this.generateId();
            this.rawData.push(item);
            resolve(item);
        });

    }

    public async createMany(items: Array<T>): Promise<Array<T>> {
        return new Promise<Array<T>>(resolve => {
            items.forEach(item => {
                item._id = this.generateId();
                this.rawData.push(item);
            });
                
            resolve(items);
        });
    }

    public async retrieve(options: IQueryOptions): Promise<T[]> {
        return new Promise<T[]>((resolve) => {

            options.limit = Math.abs(options.limit || 50);
            options.page = Math.abs(options.page || 0);

            resolve(this.items.slice(options.page * options.limit, options.limit));
        });
    }

    public async update(id: string, item: T): Promise<T> {
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

    public async delete(id: string): Promise<void> {
        return new Promise<void>((resolve) => {
            const index = this.items.findIndex(item => item._id === id);
            if (index > -1) {
                this.items.splice(index, 1);
            }
            resolve();
        });
    }

    public findById(id: string): Promise<T> {
        return new Promise<T>((resolve) => {
            resolve(this.items.find(item => item._id === id));
        });
    }

    public findOne(condition: any): Promise<T> {
        return new Promise<T>((resolve) => {
            resolve(this.items.find(condition));
        });
    }

    protected generateId(): any {
        // return mongoose.Types.ObjectId.createFromHexString(id);

        return uuid();
    }

}
