import IDeviceFactory from './interfaces/IDeviceFactory';
import IDeviceModel from '../model/interfaces/IDeviceModel';
import IDevice from './interfaces/IDevice';
import ArduinoThermostat from './ArduinoThermostat';
import { injectable } from 'inversify';
import autobind from 'autobind-decorator';
import container from '../../config/inversify.config';

@injectable()
@autobind
export default class DeviceFactory implements IDeviceFactory {
    
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
            device = container.get<IDevice>('IThermostatDevice');
        } 

        if (device)
            device.setConfig(model.config);
        return device;
    }

    
}