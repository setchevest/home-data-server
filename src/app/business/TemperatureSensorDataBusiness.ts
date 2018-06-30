import BaseBusiness from "./Base/BaseBusiness";
import ITemperatureSensorDataModel from "../model/interfaces/ITemperatureSensorDataModel";
import { TemperatureSensorDataRepository } from "../repository/TemperatureSensorDataRepository";
import { sealed } from "../../core/Decorators";

@sealed
export default class TemperatureSensorDataBusiness extends BaseBusiness<ITemperatureSensorDataModel> {
    constructor() {
        super(new TemperatureSensorDataRepository());
    }

    public create(item: ITemperatureSensorDataModel, callback: (error: any, result: any) => void) {
        this._repository.create(item, callback);
    }
}