import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { asyncMessage } from '../../core/decorators/EventGenerator';
import { IHttpActionModel } from '../model/interfaces/IHttpActionModel';
import { Events } from './Events';
import { Types } from '../../config/Types';
@sealed
@injectable()
export default class HttpActionBusiness extends BaseBusiness<IHttpActionModel> {
    constructor(
        @inject(Types.IRepository_IHttpActionModel)
        repository: IRepository<IHttpActionModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', Events.Task.Changed)
    public async update(id: string, item: IHttpActionModel): Promise<IHttpActionModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', Events.Task.Changed)
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}