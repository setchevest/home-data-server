import { inject, injectable } from 'inversify';
import IDeviceFactory from './interfaces/IDeviceFactory';
import IDevice from './interfaces/IDevice';
import IDeviceModel from '../model/interfaces/IThermostatDeviceModel';
import { IGenericDeviceModel, isIGenericDeviceModel } from '../model/interfaces/IGenericDeviceModel';
import { IMessageBroker } from '../../core/intefaces/IMessageBroker';
import IRepository from '../repository/interfaces/IRepository';
import { Events } from '../business/Events';
import { Types } from '../../config/Types';
import IDeviceRegistry from './interfaces/IDeviceRegistry';
import { ILogger } from '../../core/intefaces/ILogger';

@injectable()
export default class DeviceRegistry implements IDeviceRegistry {

    private devices: Map<string, IDevice> = new Map<string, IDevice>();

    constructor(@inject(Types.IDeviceFactory) private deviceFactory: IDeviceFactory,
        @inject(Types.IRepository_IDeviceModel) private deviceBusiness: IRepository<IDeviceModel>,
        @inject(Types.IRepository_IGenericDeviceModel) private genericBusiness: IRepository<IGenericDeviceModel>,
        @inject(Types.IMessageBroker) messageBroker: IMessageBroker,
        @inject(Types.ILogger) private logger: ILogger) {
        
        let deviceName = '';
        const saveInit = (result: IDeviceModel) => {
            this.internalRegister(this.deviceFactory.create(result));
        };
        const errorInit = error => {
            this.logger.error(`Creating device "${deviceName}"`, error.message || error);
        };

        messageBroker.subscribe(Events.Device.Changed)
            .subscribe(Events.Device.incomming.all)
            .on(Events.Device.incomming.asRegExp().init, (topics, message) => {
                if (topics.length > 0) {
                    deviceName = topics[1];
                    logger.debug(`Device "${deviceName}" initialization.`, message);
                    if (!this.devices.get(deviceName)) {
                        this.genericBusiness.create({
                            name: deviceName,
                            enabled: true,
                            registrationData: message.payload,
                            config: message.payload,
                        })
                        .then(saveInit)
                        .catch(errorInit);
                    } else {
                        this.deviceBusiness.findOneAndUpdate({name: deviceName}, <any> {registrationData: message.payload})
                        .then(saveInit)
                        .catch(errorInit);
                    }
                }
            });
        this.loadDevices();
    }

    /*
    * TODO: Remove this initialier.
    */
    private loadDevices(): void {
        this.devices.clear();
        this.deviceBusiness.retrieve({ condition: { enabled: true } }).then(devs => {
            devs.map(this.deviceFactory.create).forEach(this.internalRegister.bind(this));
        });
    }

    private internalRegister(d: IDevice) {
        if (this.devices.get(d.name)) {
            this.logger.warning(`Multiple devices called "${d.name}". Please provide an alias.`);
        } else {
            this.devices.set(d.name, d);
            this.logger.debug(`Device registered "${d.name}"`, d);
        }
    }

    public register(key: string, value: IDevice) {
        this.devices.set(key, value);
    }

    public get(key: string): IDevice {
        return this.devices.get(key);
    }
}