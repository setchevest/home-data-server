import IBaseBusiness from "../interfaces/base/IBaseBusiness";
import RepositoryBase from "../../repository/base/RepositoryBase";
import BaseModel from "../../model/BaseModel";
import IModel from "../../model/interfaces/IModel";
import { resolve } from "url";


export default abstract class BaseBusiness<T extends IModel> implements IBaseBusiness<T> {

    protected repository: RepositoryBase<T>;

    constructor(repository: RepositoryBase<T>) {
        this.repository = repository;
    }

    public create(item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return this.repository.create(item, callback);
    }

    public retrieve(callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return this.repository.retrieve(callback);
    }

    public update(id: string, item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return new Promise<T>(function (resolve, reject) {
            this.repository.findById(id, callback)
                .then(function (res) {
                    this.repository.update(res._id, item, callback).
                        then(resolve)
                        .catch(reject);
                }).catch(reject);
        });
    }

    public delete(id: string, callback?: (error: any, result: T) => void): Promise<void> {
        return this.repository.delete(id, callback);
    }

    public findById(id: string, callback?: (error: any, result: T) => void): Promise<T> {
        return this.repository.findById(id, callback);
    }
}