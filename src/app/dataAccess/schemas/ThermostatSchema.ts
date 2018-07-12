import DataAccess from "../DataAccess";
import IThermostatModel from "../../model/interfaces/IThermostatModel";
import { Schema, Model } from "mongoose";
import IMongooseModel from "../interfaces/IMongooseModel";

var mongooseConnection = DataAccess.mongooseConnection;

export class ThermostatSchema extends Schema {

    /**
     *
     */
    constructor() {
        super({
            mode: {
                type: String,
                required: true
            },
            isOn: {
                type: Boolean,
                required: true
            }},
            {
                timestamps: true
            });

    }
}

export interface IThermostatMongooseModel extends IMongooseModel, IThermostatModel{

}

var model: Model<IThermostatMongooseModel> = mongooseConnection.model<IThermostatMongooseModel>("Thermostat", new ThermostatSchema());
export default model;