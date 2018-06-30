import IRead from "./../interfaces/base/IRead";
import IWrite from "./../interfaces/base/IWrite";

import * as mongoose from "mongoose";

export default class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<T>;

    protected get model() : mongoose.Model<T>
    {
        return this._model;
    }

    constructor(schemaModel: mongoose.Model<T>) {
        this._model = schemaModel;
    }

    public create(item: T, callback: (error: any, result: T[]) => void) {
        this._model.create(item, callback);

    }

    public retrieve(callback: (error: any, result: T[]) => void) {
        this._model.find({}, callback)
    }

    public update(_id: string, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    public delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    public findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

    public findOneWhere(condition: any, callback: (error: any, result: T) => void) {
        this._model.findOne(condition, callback);
    }

    protected toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }

}