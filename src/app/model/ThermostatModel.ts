import IThermostatModel from "./interfaces/IThermostatModel";
import BaseModel from "./BaseModel";
import { sealed } from "../../core/Decorators";

@sealed
export default class ThermostatModel extends BaseModel<IThermostatModel> {

    get mode(): string {
        return this._model.mode;
    }

    get isOn(): boolean {
        return this._model.isOn;
    }
}