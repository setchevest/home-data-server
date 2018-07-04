import * as mongoose from "mongoose";
import IRepository from "../interfaces/IRepository";

export default class RepositoryBase<T extends mongoose.Document> implements IRepository<T> {
    
    private _model: mongoose.Model<T>;

    protected get model() : mongoose.Model<T>
    {
        return this._model;
    }

    constructor(schemaModel: mongoose.Model<T>) {
        this._model = schemaModel;
    }

    public create(item: T, callback?: (error: any, result: T) => void) : Promise<T> {
        return this._model.create(item, callback);
    }

    public retrieve(callback?: (error: any, result: T[]) => void) : Promise<T[]> {
        return this._model.find(callback).exec();
    }

    public update(id: string, item: T, callback?: (error: any, result: T) => void) : Promise<T> {
        return this._model.update({ _id: id }, item, callback).exec();
    }

    public delete(_id: string, callback?: (error: any, result: T) => void) : Promise<void> {
        return this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null)).exec();
    }

    public findById(id: string, callback?: (error: any, result: T) => void) : Promise<T> {
        return this._model.findById(id, callback).exec();
    }

    public findOne(condition: any, callback?: (error: any, result: T) => void) : Promise<T> {
        return this._model.findOne(condition, callback).exec();
    }

    protected toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }

}