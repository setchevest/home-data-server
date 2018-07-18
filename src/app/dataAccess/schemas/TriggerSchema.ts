import { ITriggerMongooseModel } from '../interfaces/ITriggerMongooseModel';

import DataAccess from '../DataAccess';
import { Schema, Model } from 'mongoose';

const mongooseConnection = DataAccess.mongooseConnection;

export class TriggerSchema extends Schema {

    /**
     *
     */
    constructor() {
        super({
            type: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: false,
            },
            endDate: {
                type: Date,
                required: false,
            }},
            {
                discriminatorKey: 'type',
                timestamps: true,
            });

    }
}

const model: Model<ITriggerMongooseModel> = mongooseConnection.model<ITriggerMongooseModel>('Trigger', new TriggerSchema());
export default model;