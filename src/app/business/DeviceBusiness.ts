import BaseBusiness from './Base/BaseBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { asyncMessage } from '../../core/decorators/EventGenerator';
import IDeviceModel from '../model/interfaces/IDeviceModel';
@sealed
@injectable()
export default class DeviceBusiness extends BaseBusiness<IDeviceModel> {
    constructor(
        @inject('IRepository<IDeviceModel>')
        repository: IRepository<IDeviceModel>) {
        super(repository);
    }

    @asyncMessage('IMessageBroker', 'deviceChanged')
    public async create(item: IDeviceModel): Promise<IDeviceModel> {
        return super.create(item);
    }

    @asyncMessage('IMessageBroker', 'deviceChanged')
    public async update(id: string, item: IDeviceModel): Promise<IDeviceModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', 'deviceChanged')
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }
}