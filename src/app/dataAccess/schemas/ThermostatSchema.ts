import { IThermostatMongooseModel } from '../interfaces/IThermostatMongooseModel';

import DataAccess from '../DataAccess';
import { Schema, Model } from 'mongoose';

const mongooseConnection = DataAccess.mongooseConnection;

export class ThermostatSchema extends Schema {

    /**
     *
     */
    constructor() {
        super({
            mode: {
                type: String,
                required: true,
            },
            isOn: {
                type: Boolean,
                required: true,
            }},
            {
                timestamps: true,
            });

    }
}

const model: Model<IThermostatMongooseModel> = mongooseConnection.model<IThermostatMongooseModel>('Thermostat', new ThermostatSchema());
export default model;
