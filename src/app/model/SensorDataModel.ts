import BaseModel from "./BaseModel";
import ISensorDataModel from "./interfaces/ISensorDataModel";
import IZoneModel from "./interfaces/IZoneModel";
import { sealed } from "../../core/Decorators";

@sealed
export default abstract class SensorDataModel<T extends ISensorDataModel> extends BaseModel<T> {

    get zoneId(): any {
        return this._model.zone;
    }
}