import DataAccess from '../DataAccess';
import ISensorDataModel from '../../model/interfaces/ISensorDataModel';
import { Schema } from 'mongoose';
import IMongooseModel from '../interfaces/IMongooseModel';

const mongooseConnection = DataAccess.mongooseConnection;

export class SensorData extends Schema {

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

export interface ISensorDataMongooseModel extends IMongooseModel, ISensorDataModel {
}
const model = mongooseConnection.model<ISensorDataMongooseModel>('SensorData', new SensorData());
export default model;
