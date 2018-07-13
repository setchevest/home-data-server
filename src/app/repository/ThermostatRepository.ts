import 'reflect-metadata';
import model from '../dataAccess/schemas/ThermostatSchema';
import MongooseRepository from './base/MongooseRepository';
import IThermostatModel from '../model/interfaces/IThermostatModel';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';


@sealed
@injectable()
export default class ThermostatRepository extends MongooseRepository<IThermostatModel> {
    constructor() {
        super(model);
   }    
}
