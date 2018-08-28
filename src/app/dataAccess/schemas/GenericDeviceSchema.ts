import { Schema, Model } from 'mongoose';
import Device from './DeviceSchema';
import { IGenericDeviceMongooseModel } from '../interfaces/IGenericDeviceMongooseModel';

export class GenericDeviceSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            registrationData: {
                type: Map,
                required: true,
            },
        });
    }
}

const model: Model<IGenericDeviceMongooseModel> = Device.discriminator<IGenericDeviceMongooseModel>('Generic', new GenericDeviceSchema());
export default model;
