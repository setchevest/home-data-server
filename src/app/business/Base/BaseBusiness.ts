import IBaseBusiness from "../interfaces/base/IBaseBusiness";
import IModel from "../../model/interfaces/IModel";
import IRepository from "../../repository/interfaces/IRepository";
import { injectable } from "inversify";

@injectable()
export default abstract class BaseBusiness<T extends IModel> implements IBaseBusiness<T> {

    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
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

    public delete(id: string, callback?: (error: any) => void): Promise<void> {
        return this.repository.delete(id, callback);
    }

    public findById(id: string, callback?: (error: any, result: T) => void): Promise<T> {
        return this.repository.findById(id, callback);
    }

    public findOne(condition: any, callback?: (error: any, result: T) => void) : Promise<T>{
        return this.repository.findOne(condition, callback);
    }
}