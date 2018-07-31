import IBaseBusiness from '../interfaces/base/IBaseBusiness';
import IModel from '../../model/interfaces/IModel';
import IRepository from '../../repository/interfaces/IRepository';
import { injectable } from 'inversify';
import autobind from 'autobind-decorator';
import IQueryOptions from '../../repository/interfaces/base/IQueryOptions';

@injectable()
@autobind
export default abstract class BaseBusiness<T extends IModel> implements IBaseBusiness<T> {

    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    public async create(item: T): Promise<T> {
        return this.repository.create(item);
    }

    public async createMany(items: Array<T>): Promise<Array<T>> {
        return this.repository.createMany(items);
    }

    public async retrieve(options: IQueryOptions): Promise<T[]> {
        return this.repository.retrieve(options);
    }

    public async update(id: string, item: T): Promise<T> {
        const repo = this.repository;
        return new Promise<T>(function (resolve, reject) {
            repo.findById(id)
                .then(function (res) {
                    repo.update(res._id, item)
                        .then(resolve)
                        .catch(reject);
                }).catch(reject);
        });
    }

    public async delete(id: string, callback?: (error: any) => void): Promise<void> {
        return this.repository.delete(id);
    }

    public async findById(id: string): Promise<T> {
        return this.repository.findById(id);
    }

    public async findOne(condition: any): Promise<T> {
        return this.repository.findOne(condition);
    }
}
