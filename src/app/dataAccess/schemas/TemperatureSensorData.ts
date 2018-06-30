import ITemperatureSensorDataModel from "./../../model/interfaces/ITemperatureSensorDataModel";
import SensorData from "./SensorData";
import { Schema, Model } from "mongoose";

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
var model: Model<ITemperatureSensorDataModel> = <Model<ITemperatureSensorDataModel>>SensorData.discriminator("temperature", new TemperatureSensorData());
export default model;