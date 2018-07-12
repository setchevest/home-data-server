import model from "../dataAccess/schemas/TemperatureSensorData"
import MongooseRepositoryBase from "./base/MongooseRepositoryBase";
import ITemperatureSensorDataModel from "../model/interfaces/ITemperatureSensorDataModel";
import { sealed } from "../../core/decorators/Sealed";
import { injectable } from 'inversify';

@sealed
@injectable()
export class TemperatureSensorDataRepository extends MongooseRepositoryBase<ITemperatureSensorDataModel> {
    constructor() {
         super(model);
    }
}
