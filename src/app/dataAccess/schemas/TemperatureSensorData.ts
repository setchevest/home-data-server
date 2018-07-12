import ITemperatureSensorDataModel from "../../model/interfaces/ITemperatureSensorDataModel";
import SensorData from "./SensorData";
import { Schema, Model } from "mongoose";
import IMongooseModel from "../interfaces/IMongooseModel";

export class TemperatureSensorData extends Schema {
    /**
     *
     */
    constructor() {
        super({
            temperature: {
                type: Number,
                required: true
            },
            humidity: {
                type: Number,
                required: false
            }
        });
    }
}

export interface ITemperatureSensorDataMongooseModel extends IMongooseModel, ITemperatureSensorDataModel{

}

var model: Model<ITemperatureSensorDataMongooseModel> = <Model<ITemperatureSensorDataMongooseModel>>SensorData.discriminator("temperature", new TemperatureSensorData());
export default model;