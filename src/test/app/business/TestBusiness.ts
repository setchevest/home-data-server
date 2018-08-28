import BaseBusiness from '../../../app/business/Base/BaseBusiness';
import { sealed } from '../../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../../../app/repository/interfaces/IRepository';
import { IFunctionActionModel } from '../../../app/model/interfaces/IFunctionActionModel';
import { asyncMessage } from '../../../core/decorators/EventGenerator';
import { Events } from '../../../app/business/Events';
import { Types } from '../../../config/Types';
import ITestModel from '../model/interfaces/ITestModel';
@sealed
@injectable()
export default class TestBusiness extends BaseBusiness<ITestModel> {
    constructor(
        @inject(Types.IRepository_IFunctionActionModel)
        repository: IRepository<ITestModel>) {
        super(repository);
    }

    // @asyncMessage('IMessageBroker', Events.Task.Changed)
    // public async update(id: string, item: ITestModel): Promise<ITestModel> {
    //     return super.update(id, item);
    // }

    // @asyncMessage('IMessageBroker', Events.Task.Changed)
    // public async delete(id: string): Promise<void> {
    //     return super.delete(id);
    // }
}