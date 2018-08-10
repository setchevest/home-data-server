import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { IFunctionActionModel } from '../model/interfaces/IFunctionActionModel';
import { asyncMessage } from '../../core/decorators/EventGenerator';
import IActionModel from '../model/interfaces/IActionModel';
@sealed
@injectable()
export default class ActionBusiness extends BaseBusiness<IActionModel> {
    constructor(
        @inject('IRepository<IActionModel>')
        repository: IRepository<IActionModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async update(id: string, item: IActionModel): Promise<IActionModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}