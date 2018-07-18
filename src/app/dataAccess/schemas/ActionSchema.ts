import { IActionMongooseModel } from '../interfaces/IActionMongooseModel';

import DataAccess from '../DataAccess';
import { Schema, Model } from 'mongoose';

const mongooseConnection = DataAccess.mongooseConnection;

export class ActionSchema extends Schema {

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
            },
            parameters: {
                type: Array,
                required: false,
            }},
            {
                discriminatorKey: 'type',
                timestamps: true,
            });

    }
}

const model: Model<IActionMongooseModel> = mongooseConnection.model<IActionMongooseModel>('Action', new ActionSchema());
export default model;