import model from '../dataAccess/schemas/DeviceSchema';
import MongooseRepository from './base/MongooseRepository';
import { sealed } from '../../core/decorators/Sealed';
import { injectable } from 'inversify';
import ITriggerModel from '../model/interfaces/ITriggerModel';
@sealed
@injectable()
export default class TriggerRepository extends MongooseRepository<ITriggerModel> {
    constructor() {
        super(model);
    }
}