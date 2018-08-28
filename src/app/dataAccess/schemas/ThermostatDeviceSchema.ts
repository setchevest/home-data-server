import { Schema, Model } from 'mongoose';
import Device from './DeviceSchema';
import { DeviceSchema } from './DeviceSchema';
import { IDeviceMongooseModel } from '../interfaces/IDeviceMongooseModel';

export class ThermostatDeviceSchema extends Schema {
    /**
     *
     */
    constructor() {
        super();
    }
}

const model: Model<IDeviceMongooseModel> = Device.discriminator<IDeviceMongooseModel>('Thermostat', new ThermostatDeviceSchema());
export default model;
