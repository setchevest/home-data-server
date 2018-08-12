import { inject, injectable } from 'inversify';
import IDeviceFactory from './interfaces/IDeviceFactory';
import IDevice from './interfaces/IDevice';
import IDeviceModel from '../model/interfaces/IDeviceModel';
import IRegistry from '../../core/intefaces/IRegistry';
import { IMessageBroker } from '../../core/intefaces/IMessageBroker';
import IRepository from '../repository/interfaces/IRepository';

@injectable()
export default class DeviceRegistry implements IRegistry<String, IDevice> {

    private devices: Map<String, IDevice> = new Map<String, IDevice>();

    constructor(@inject('IDeviceFactory') private deviceFactory: IDeviceFactory,
        @inject('IRepository<IDeviceModel>') private deviceBs: IRepository<IDeviceModel>,
        @inject('IMessageBroker') private messageBroker: IMessageBroker) {

        messageBroker.subscribe('deviceChanged', this.loadDevices);
        this.loadDevices();
    }

    /*
    * TODO: Remove this initialier.
    */
    private loadDevices(): void {
        this.devices.clear();
        this.deviceBs.retrieve({ condition: { enabled: true } }).then(devs => {
            devs.map(this.deviceFactory.create).forEach(d => {
                this.devices.set(d.name, d);
            });
        });
    }

    public register(key: String, value: IDevice) {
        this.devices.set(key, value);
    }

    public get(key: String): IDevice {
        return this.devices.get(key);
    }
}