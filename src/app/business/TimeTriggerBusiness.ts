import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import ITimeTriggerModel from '../model/interfaces/ITimeTriggerModel';
import { asyncMessage } from '../../core/decorators/EventGenerator';

@sealed
@injectable()
export default class TimeTriggerBusiness extends BaseBusiness<ITimeTriggerModel> {
    constructor(@inject('IRepository<ITimeTriggerModel>')
        repository: IRepository<ITimeTriggerModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async update(id: string, item: ITimeTriggerModel): Promise<ITimeTriggerModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}

