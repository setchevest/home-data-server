import IDeviceFactory from './interfaces/IDeviceFactory';
import IDeviceModel from '../model/interfaces/IDeviceModel';
import IDevice from './interfaces/IDevice';
import { injectable, inject } from 'inversify';
import autobind from 'autobind-decorator';
import IBaseDeviceConstructor from './interfaces/IBaseDeviceConstructor';
import { Types } from '../../config/Types';

@injectable()
@autobind
export default class DeviceFactory implements IDeviceFactory {

    /**
     *
     */
    constructor(@inject(Types.IBaseDeviceConstructor) private ThermostatConstructor: IBaseDeviceConstructor) {
        
    }
    
    public createAsync(model: IDeviceModel): Promise<IDevice> {
        return new Promise<IDevice>((resolve, reject) => {
            const device: IDevice = this.createDevice(model);
            if (device) {
                resolve(device);
            } else {
                reject('Device could not be created.');
            }
        });
    }

    public create(model: IDeviceModel): IDevice {
        return this.createDevice(model);
    }

    private createDevice(model: IDeviceModel): IDevice {
        let device: IDevice = null;
        if (model.type === 'Thermostat') {
            device = new this.ThermostatConstructor(model.name);
        }
        
        if (device)
            device.setConfig(model.config);
        return device;
    }

    
}