import BaseModel from "./BaseModel";
import IZoneModel from "./interfaces/IZoneModel";
import { sealed } from "../../core/Decorators"

@sealed
export default class ZoneModel extends BaseModel<IZoneModel> {

    get internalId(): number {
        return this._model.internalId;
    }

    get name(): string {
        return this._model.name;
    }
}