import model from "../dataAccess/schemas/TemperatureSensorData"
import RepositoryBase from "./base/RepositoryBase";
import ITemperatureSensorDataModel from "../model/interfaces/ITemperatureSensorDataModel";
import { sealed } from "../../core/Decorators";

@sealed
export class TemperatureSensorDataRepository extends RepositoryBase<ITemperatureSensorDataModel> {
    constructor() {
        super(model);
    }
}
