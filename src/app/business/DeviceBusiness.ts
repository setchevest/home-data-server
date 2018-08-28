import BaseBusiness from './Base/BaseBusiness';
import IDeviceBusiness from './interfaces/IDeviceBusiness';
import { sealed } from '../../core/decorators/Sealed';
import { injectable, inject } from 'inversify';
import IRepository from '../repository/interfaces/IRepository';
import { asyncMessage } from '../../core/decorators/EventGenerator';
import IDeviceModel from '../model/interfaces/IDeviceModel';
import IDevice from '../devices/interfaces/IDevice';
import { isInputDevice } from '../devices/interfaces/IInputDevice';
import IRegistry from '../../core/intefaces/IRegistry';
import { Events } from './Events';
import { Types } from '../../config/Types';

@sealed
@injectable()
export default class DeviceBusiness extends BaseBusiness<IDeviceModel> implements IDeviceBusiness {
    
    constructor(
        @inject(Types.IRepository_IDeviceModel)repository: IRepository<IDeviceModel>,
        @inject(Types.IRegistry_String_IDevice)private deviceRegistry: IRegistry<String, IDevice>) {
        super(repository);
    }

    private async getDevice(deviceName: String): Promise<IDevice> {

        const device = this.deviceRegistry.get(deviceName);
        if (!device) {
            return Promise.reject(`No device found: ${deviceName}`);
        } else {
            return Promise.resolve(device);
        }
    }

    @asyncMessage('IMessageBroker', Events.Device.Changed)
    public async create(item: IDeviceModel): Promise<IDeviceModel> {
        return super.create(item);
    }

    @asyncMessage('IMessageBroker', Events.Device.Changed)
    public async update(id: string, item: IDeviceModel): Promise<IDeviceModel> {
        return super.update(id, item);
    }

    @asyncMessage('IMessageBroker', Events.Device.Changed)
    public async delete(id: string): Promise<void> {
        return super.delete(id);
    }

    public async getDeviceData(name: String, query: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getDevice(name).then(device => {
                device.getData(query).then(resolve).catch(reject);
            }).catch(reject);
        });
    }
    public async setDeviceData(name: String, data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getDevice(name).then(device => {
                if (isInputDevice(device))
                    device.setData(data).then(resolve).catch(reject);
                else
                    reject(`Invalid operation on device '${name}'`);
            }).catch(reject);
        });
    }
}