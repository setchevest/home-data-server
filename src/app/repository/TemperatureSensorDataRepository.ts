import model from "../dataAccess/schemas/TemperatureSensorData"
import RepositoryBase from "./base/RepositoryBase";
import ITemperatureSensorDataModel from "../model/interfaces/ITemperatureSensorDataModel";
import { sealed } from "../../core/decorators/Sealed";
import { injectable } from 'inversify';

@sealed
@injectable()
export class TemperatureSensorDataRepository extends RepositoryBase<ITemperatureSensorDataModel> {
    constructor() {
         super(model);
    }
}
