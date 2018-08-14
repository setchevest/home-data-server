import { inject, injectable } from 'inversify';
import IDeviceFactory from './interfaces/IDeviceFactory';
import IDevice from './interfaces/IDevice';
import IDeviceModel from '../model/interfaces/IDeviceModel';
import IRegistry from '../../core/intefaces/IRegistry';
import { IMessageBroker } from '../../core/intefaces/IMessageBroker';
import IRepository from '../repository/interfaces/IRepository';
import { Events } from '../business/Events';
import { Types } from '../../config/Types';

@injectable()
export default class DeviceRegistry implements IRegistry<string, IDevice> {

    private devices: Map<string, IDevice> = new Map<string, IDevice>();

    constructor(@inject(Types.IDeviceFactory) private deviceFactory: IDeviceFactory,
        @inject(Types.IRepository_IDeviceModel) private deviceBs: IRepository<IDeviceModel>,
        @inject(Types.IMessageBroker) messageBroker: IMessageBroker) {

        messageBroker.subscribe(Events.Device.Changed, v => this.loadDevices());
        this.loadDevices();
    }

    /*
    * TODO: Remove this initialier.
    */
    private loadDevices(): void {
        this.devices.clear();
        this.deviceBs.retrieve({ condition: { enabled: true } }).then(devs => {
            devs.map(this.deviceFactory.create).forEach(d => {
                this.devices.set(d.name(), d);
            });
        });
    }

    public register(key: string, value: IDevice) {
        this.devices.set(key, value);
    }

    public get(key: string): IDevice {
        return this.devices.get(key);
    }
}