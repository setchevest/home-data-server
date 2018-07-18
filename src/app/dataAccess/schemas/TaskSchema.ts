import { ITaskMongooseModel } from '../interfaces/ITaskMongooseModel';

import DataAccess from '../DataAccess';
import { Schema } from 'mongoose';

const mongooseConnection = DataAccess.mongooseConnection;

export class TaskSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            name: { type: String, required: true },
            enabled: { type: String, required: true },
            action: {
                type: Schema.Types.ObjectId,
                ref: 'Action',
                required: true,
            },
            trigger: {
                type: Schema.Types.ObjectId,
                ref: 'Trigger',
                required: true,
            },
        },
            {
                timestamps: true,
            });

        this.pre('find', function () {
            this.populate('action');
            this.populate('trigger');
        });
    }
}

const model = mongooseConnection.model<ITaskMongooseModel>('Task', new TaskSchema());
export default model;
