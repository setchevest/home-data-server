import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import ITaskModel from '../model/interfaces/ITaskModel';
import { asyncMessage } from '../../core/decorators/EventGenerator';

@sealed
@injectable()
export default class TaskBusiness extends BaseBusiness<ITaskModel> {
    constructor(@inject('IRepository<ITaskModel>') repository: IRepository<ITaskModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async create(item: ITaskModel): Promise<ITaskModel> {
        return super.create(item);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async update(id: string, item: ITaskModel): Promise<ITaskModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}
