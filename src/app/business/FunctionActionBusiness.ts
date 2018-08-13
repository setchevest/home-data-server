import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { IFunctionActionModel } from '../model/interfaces/IFunctionActionModel';
import { asyncMessage } from '../../core/decorators/EventGenerator';
import { Events } from './Events';
import { Types } from '../../config/Types';
@sealed
@injectable()
export default class FunctionActionBusiness extends BaseBusiness<IFunctionActionModel> {
    constructor(
        @inject(Types.IRepository_IFunctionActionModel)
        repository: IRepository<IFunctionActionModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', Events.Task.Changed)
    public async update(id: string, item: IFunctionActionModel): Promise<IFunctionActionModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', Events.Task.Changed)
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}