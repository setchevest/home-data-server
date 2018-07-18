import { ISensorDataMongooseModel } from '../interfaces/ISensorDataMongooseModel';

import DataAccess from '../DataAccess';
import { Schema } from 'mongoose';

const mongooseConnection = DataAccess.mongooseConnection;

export class SensorDataSchema extends Schema {

    /**
     *
     */
    constructor() {
        super({
            type: {
                type: String,
                required: true,
            },
            zone: {
                type: Schema.Types.ObjectId,
                ref: 'Zone',
                required: true,
            },
        },
            {
                discriminatorKey: 'type',
                timestamps: true,
            });
        
        this.pre('find', function () {
            this.populate('zone');
        });
    }
}

const model = mongooseConnection.model<ISensorDataMongooseModel>('SensorData', new SensorDataSchema());
export default model;
