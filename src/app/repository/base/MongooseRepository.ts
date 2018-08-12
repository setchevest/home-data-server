import * as mongoose from 'mongoose';
import IRepository from '../interfaces/IRepository';
import { injectable, unmanaged } from 'inversify';
import IModel from '../../model/interfaces/IModel';
import IQueryOptions from '../interfaces/base/IQueryOptions';

@injectable()
export default class MongooseRepository<T extends IModel> implements IRepository<T> {

    private _model: mongoose.Model<any>;

    /**
     *
     */
    constructor(@unmanaged() model: mongoose.Model<any>) {
        this._model = model;
    }

    protected get model(): mongoose.Model<any> {
        return this._model;
    }

    public async create(item: T): Promise<T> {
        return this._model.create(item);
    }

    public async createMany(items: T[]): Promise<T[]> {
        return this._model.insertMany(items);
    }

    public async retrieve(options: IQueryOptions): Promise<T[]> {
        options = options || <IQueryOptions>{};
        options.limit = Math.abs(options.limit || 50);
        options.page = Math.abs(options.page || 0);
        options.sort = options.sort || {};
        const query = this._model.find(options.condition).limit(options.limit).skip(options.limit * options.page).sort(options.sort);
        if (options.populate) {
            options.populate.forEach(element => {
                query.populate(element);
            });
        }
        return query.exec();
    }

    public async update(id: string, item: T): Promise<T> {
        return this._model.update({ _id: id }, item).exec();
    }

    public async delete(id: string): Promise<void> {
        return this._model.remove({ _id: this.toObjectId(id) }).exec();
    }

    public async findById(id: string): Promise<T> {
        return this._model.findById(this.toObjectId(id)).exec();
    }

    public async findOne(condition: any): Promise<T> {
        return this._model.findOne(condition).exec();
    }

    protected toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }

}
