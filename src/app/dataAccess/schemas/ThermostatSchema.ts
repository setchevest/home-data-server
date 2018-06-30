import DataAccess from "./../../dataAccess/DataAccess";
import IThermostatModel from "./../../model/interfaces/IThermostatModel";
import { Schema, Model } from "mongoose";

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
var model: Model<IThermostatModel> = mongooseConnection.model<IThermostatModel>("Thermostat", new ThermostatSchema());
export default model;