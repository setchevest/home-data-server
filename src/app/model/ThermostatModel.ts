import IThermostatModel from "./interfaces/IThermostatModel";
import BaseModel from "./BaseModel";
import { sealed } from "../../core/Decorators";
import IZoneModel from "./interfaces/IZoneModel";
import ITemperatureSensorDataModel from "./interfaces/ITemperatureSensorDataModel";

@sealed
export default class ThermostatModel extends BaseModel<IThermostatModel> {
    
    temperatureData: ITemperatureSensorDataModel;

    /**
     *
     */
    constructor(model: IThermostatModel, temperatureData: ITemperatureSensorDataModel) {
        super(model);
        this.temperatureData = temperatureData;
    }

    get mode(): string {
        return this._model.mode;
    }

    get isOn(): boolean {
        return this._model.isOn;
    }

    get temperature(): number {
        return this.temperatureData.temperature;
    }

    get humidity(): number {
        return this.temperatureData.humidity;
    }
}