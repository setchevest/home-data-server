import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { asyncMessage } from '../../core/decorators/EventGenerator';
import { IHttpActionModel } from '../model/interfaces/IHttpActionModel';
@sealed
@injectable()
export default class HttpActionBusiness extends BaseBusiness<IHttpActionModel> {
    constructor(
        @inject('IRepository<IHttpActionModel>')
        repository: IRepository<IHttpActionModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async update(id: string, item: IHttpActionModel): Promise<IHttpActionModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', 'taskChanged')
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}