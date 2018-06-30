import ITemperatureSensorDataModel from "./interfaces/ITemperatureSensorDataModel";
import SensorDataModel from "./SensorDataModel";
import { sealed } from "../../core/Decorators";

@sealed
export default class TemperatureSensorDataModel extends SensorDataModel<ITemperatureSensorDataModel> {

    get type(): string {
        return "Temperature";
    }
    get temperature(): number {
        return this._model.temperature;
    }

    get humidity(): number {
        return this._model.humidity;
    }

    public update() {
        console.log("update");
    }
}