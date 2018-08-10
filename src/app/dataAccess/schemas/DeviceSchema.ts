import { IDeviceMongooseModel } from '../interfaces/IDeviceMongooseModel';

import DataAccess from '../DataAccess';
import { Schema } from 'mongoose';

const mongooseConnection = DataAccess.mongooseConnection;

export class DeviceSchema extends Schema {

    /**
     *
     */
    constructor() {
        super({
            type: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
                index: true,
                unique: true,
            },
            enabled: { type: Boolean, required: true },
            config: {
                type: Map,
                required: true,
            },
        },
            {
                discriminatorKey: 'type',
                timestamps: true,
            });
    }
}

const model = mongooseConnection.model<IDeviceMongooseModel>('Device', new DeviceSchema());
export default model;
