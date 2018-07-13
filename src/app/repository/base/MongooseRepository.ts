import * as mongoose from 'mongoose';
import IRepository from '../interfaces/IRepository';
import { injectable, unmanaged } from 'inversify';
import IModel from '../../model/interfaces/IModel';

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

    public create(item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.create(item, callback);
    }

    public retrieve(callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return this._model.find(callback).exec();
    }

    public update(id: string, item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.update({ _id: id }, item, callback).exec();
    }

    public delete(id: string, callback?: (error: any)  => void): Promise<void> {
        return this._model.remove({ _id: this.toObjectId(id) }, callback).exec();
    }

    public findById(id: string, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.findById(this.toObjectId(id), callback).exec();
    }

    public findOne(condition: any, callback?: (error: any, result: T) => void): Promise<T> {
        return this._model.findOne(condition, callback).exec();
    }

    protected toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }

}
