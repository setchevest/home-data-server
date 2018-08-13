import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { IFunctionActionModel } from '../model/interfaces/IFunctionActionModel';
import { asyncMessage } from '../../core/decorators/EventGenerator';
import IActionModel from '../model/interfaces/IActionModel';
import { Events } from './Events';
import { Types } from '../../config/Types';
@sealed
@injectable()
export default class ActionBusiness extends BaseBusiness<IActionModel> {
    constructor(
        @inject(Types.IRepository_IActionModel)
        repository: IRepository<IActionModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', Events.Task.Changed)
    public async update(id: string, item: IActionModel): Promise<IActionModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', Events.Task.Changed)
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}