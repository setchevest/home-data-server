import DataAccess from '../DataAccess';
import IZoneModel from '../../model/interfaces/IZoneModel';
import { Schema } from 'mongoose';
import IMongooseModel from '../interfaces/IMongooseModel';

const mongooseConnection = DataAccess.mongooseConnection;

export class ZoneSchema extends Schema {
    /**
     *
     */
    constructor() {
        super({
            internalId: {
                type: Number,
                required: true,
                index: true,
            },
            name: {
                type: String,
                required: true,
            }},
            {
                timestamps: true,
            });

        this.query.byName = function (name) {
            return this.where({ name: new RegExp(name, 'i') });
        };

        this.query.byInternalId = function (id: number) {
            return this.where({ internalId: id });
        };
    }
}

export interface IZoneMongooseModel extends IMongooseModel, IZoneModel {

}


const model = mongooseConnection.model<IZoneMongooseModel>('Zone', new ZoneSchema());
export default model;
