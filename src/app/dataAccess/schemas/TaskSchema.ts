import DataAccess from '../DataAccess';
import { Schema } from 'mongoose';
import ITaskModel from '../../model/interfaces/ITaskModel';
import IMongooseModel from '../interfaces/IMongooseModel';

const mongooseConnection = DataAccess.mongooseConnection;

export class TaskSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            name: { type: String, required: true },
            enabled: { type: String, required: true },
            action: { type: String },
            trigger: { type: String },
        },
            {
                timestamps: true,
            });
    }
}

export interface ITaskMongooseModel extends IMongooseModel, ITaskModel {

}

const model = mongooseConnection.model<ITaskMongooseModel>('Task', new TaskSchema());
export default model;
