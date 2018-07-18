import * as mongoose from 'mongoose';
import IRepository from '../interfaces/IRepository';
import { injectable, unmanaged } from 'inversify';
import IModel from '../../model/interfaces/IModel';
import logger from '../../../core/Logger';

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

    public async create(item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.create(item, callback);
    }

    public async createMany(items: T[], callback?: (error: any, result: any) => void): Promise<T[]> {
        return this._model.insertMany(items, callback);
    }

    public async retrieve(contition?: any, callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return this._model.find(contition, callback).exec();
    }

    public async retrieveMany(limit: number, page: number, callback?: (error: any, result: T[]) => void): Promise<T[]> {
        limit = Math.abs(limit || 50);
        page = Math.abs(page || 0);
        return this._model.find(callback).limit(limit).skip(limit * page).exec();
    }

    public async update(id: string, item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.update({ _id: id }, item, callback).exec();
    }

    public async delete(id: string, callback?: (error: any) => void): Promise<void> {
        return this._model.remove({ _id: this.toObjectId(id) }, callback).exec();
    }

    public async findById(id: string, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.findById(this.toObjectId(id), callback).exec();
    }

    public async findOne(condition: any, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.findOne(condition, callback).exec();
    }

    protected toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }

}
