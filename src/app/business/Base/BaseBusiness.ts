import IBaseBusiness from '../interfaces/base/IBaseBusiness';
import IModel from '../../model/interfaces/IModel';
import IRepository from '../../repository/interfaces/IRepository';
import { injectable } from 'inversify';
import autobind from '../../../../node_modules/autobind-decorator';

@injectable()
@autobind
export default abstract class BaseBusiness<T extends IModel> implements IBaseBusiness<T> {

    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    public async create(item: T, callback?: (error: any, result: T) => void): Promise<T> {
        return this.repository.create(item, callback);
    }

    public async createMany(items: Array<T>, callback?: (error: any, result: T) => void): Promise<Array<T>> {
        return this.repository.createMany(items, callback);
    }

    public async retrieve(contition?: any, callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return this.repository.retrieve(contition, callback);
    }

    public async retrieveMany(limit: number, page: number, callback?: (error: any, result: T[]) => void): Promise<T[]> {
        return this.repository.retrieveMany(limit, page, callback);
    }

    public async update(id: string, item: T, callback?: (error: any, result: T) => void): Promise<T> {
        const repo = this.repository;
        return new Promise<T>(function (resolve, reject) {
            repo.findById(id, callback)
                .then(function (res) {
                    repo.update(res._id, item, callback)
                        .then(resolve)
                        .catch(reject);
                }).catch(reject);
        });
    }

    public async delete(id: string, callback?: (error: any) => void): Promise<void> {
        return this.repository.delete(id, callback);
    }

    public async findById(id: string, callback?: (error: any, result: T) => void): Promise<T> {
        return this.repository.findById(id, callback);
    }

    public async findOne(condition: any, callback?: (error: any, result: T) => void): Promise<T> {
        return this.repository.findOne(condition, callback);
    }
}
