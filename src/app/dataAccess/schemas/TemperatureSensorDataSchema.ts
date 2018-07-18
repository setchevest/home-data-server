import { ITemperatureSensorDataMongooseModel } from '../interfaces/ITemperatureSensorDataMongooseModel';

import SensorData from './SensorDataSchema';
import { Schema, Model } from 'mongoose';

export class TemperatureSensorDataSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            temperature: {
                type: Number,
                required: true,
            },
            humidity: {
                type: Number,
                required: false,
            },
        });
    }
}

const model: Model<ITemperatureSensorDataMongooseModel> = 
    <Model<ITemperatureSensorDataMongooseModel>>SensorData.discriminator('temperature', new TemperatureSensorDataSchema());
export default model;
