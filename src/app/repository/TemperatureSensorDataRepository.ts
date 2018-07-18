import model from '../dataAccess/schemas/TemperatureSensorDataSchema';
import MongooseRepository from './base/MongooseRepository';
import ITemperatureSensorDataModel from '../model/interfaces/ITemperatureSensorDataModel';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';

@sealed
@injectable()
export class TemperatureSensorDataRepository extends MongooseRepository<ITemperatureSensorDataModel> {
    constructor() {
         super(model);
    }
}
